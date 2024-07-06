import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import axios from "axios";
import { Facility, WishList } from '@prisma/client';

@Injectable()
export class FacilityService {
    constructor(private prismaService: PrismaService) {}

    private handleNullValue(value: any): string {
        return value === null || value === undefined ? '' : value;
    }

    private async fetchFacilities(endpoint: string, apiKey: string, pSize: number = 0) {
        const url = `https://openapi.gg.go.kr/${endpoint}?KEY=${apiKey}&Type=json${pSize ? `&pSize=${pSize}` : ''}`;
        const response = await axios.get(url);
        return response.data[endpoint][1].row;
    }

    private async saveFacility(facility: any, nameField: string) {
        await this.prismaService.facility.create({
            data: {
                SIGUN_CD: this.handleNullValue(facility.SIGUN_CD),
                SIGUN_NM: this.handleNullValue(facility.SIGUN_NM),
                BIZPLC_NM: this.handleNullValue(facility[nameField]),
                REFINE_LOTNO_ADDR: this.handleNullValue(facility.REFINE_LOTNO_ADDR),
                REFINE_ROADNM_ADDR: this.handleNullValue(facility.REFINE_ROADNM_ADDR),
                REFINE_ZIP_CD: this.handleNullValue(facility.REFINE_ZIP_CD),
                REFINE_WGS84_LOGT: this.handleNullValue(facility.REFINE_WGS84_LOGT),
                REFINE_WGS84_LAT: this.handleNullValue(facility.REFINE_WGS84_LAT),
                LikedNumber : 0
            }
        });
    }

    async fetchAndSaveFacilities() {
        try {
            const [facilities1, facilities2] = await Promise.all([
                this.fetchFacilities('OldPersonRecuperationFacility', process.env.API_KEY1),
                this.fetchFacilities('Hosptlevaltnrcper', process.env.API_KEY2, 1000)
            ]);

            await Promise.all([
                ...facilities1.map(facility => this.saveFacility(facility, 'BIZPLC_NM')),
                ...facilities2.map(facility => this.saveFacility(facility, 'INST_NM'))
            ]);

            return { message: 'Facilities data saved successfully' };
        } catch (error) {
            console.error('Failed to fetch or save facilities data:', error);
            return { message: 'Failed to fetch facilities data' };
        }
    }

    async getFacilities() {
        return this.prismaService.facility.findMany();
    }

    async likeFacility(facilityId: string, userId: string) {
        return this.prismaService.$transaction(async (prisma) => {
    
            const updatedFacility = await prisma.facility.update({
                where: {
                    id: facilityId
                },
                data: {
                    LikedNumber: {
                        increment: 1
                    }
                }
            });
    
            await prisma.wishList.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    facility: {
                        connect: {
                            id: facilityId
                        }
                    }
                }
            });
    
            return updatedFacility;
        });
    }

    async unlikeFacility(facilityId: string, userId: string) {
        return this.prismaService.$transaction(async (prisma) => {
            const updatedFacility = await prisma.facility.update({
                where: {
                    id: facilityId
                },
                data: {
                    LikedNumber: {
                        decrement: 1
                    }
                }
            });
    
            await prisma.wishList.delete({
                where: {
                    userId_facilityId: {
                        userId,
                        facilityId: facilityId
                    }
                }
            });
    
            return updatedFacility;
        });
    }

    async getWishList(wishListData: WishList[]): Promise<Facility[]> {
        if(wishListData.length === 0) {
            return;
        }

        const facilityIds = wishListData.map(item => item.facilityId);

        const facilities = await this.prismaService.facility.findMany({
            where: {
              id: {
                in: facilityIds
              }
            }
        });

        return facilities;
    }
}
