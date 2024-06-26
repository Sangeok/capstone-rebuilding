import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import axios from "axios";

@Injectable()
export class FacilityService {
    constructor(private prismaService: PrismaService) {}

    private handleNullValue(value: any): string {
        return value === null || value === undefined ? '' : value;
    }

    async fetchAndSaveFacilities() {
        try {
            const response1 = await axios.get(`https://openapi.gg.go.kr/OldPersonRecuperationFacility?KEY=${process.env.API_KEY1}&Type=json`);
            const response2 = await axios.get(`https://openapi.gg.go.kr/Hosptlevaltnrcper?KEY=${process.env.API_KEY2}&Type=json&pSize=1000`);

            const facilities1 = response1.data.OldPersonRecuperationFacility[1].row;
            const facilities2 = response2.data.Hosptlevaltnrcper[1].row;

            
            for(const facility of facilities1) {
                await this.prismaService.facilitys.create({
                    data: {
                        SIGUN_CD: this.handleNullValue(facility.SIGUN_CD),
                        SIGUN_NM: this.handleNullValue(facility.SIGUN_NM),
                        BIZPLC_NM: this.handleNullValue(facility.BIZPLC_NM),
                        REFINE_LOTNO_ADDR: this.handleNullValue(facility.REFINE_LOTNO_ADDR),
                        REFINE_ROADNM_ADDR : this.handleNullValue(facility.REFINE_ROADNM_ADDR),
                        REFINE_ZIP_CD : this.handleNullValue(facility.REFINE_ZIP_CD),
                        REFINE_WGS84_LOGT : this.handleNullValue(facility.REFINE_WGS84_LOGT),
                        REFINE_WGS84_LAT : this.handleNullValue(facility.REFINE_WGS84_LAT),
                    }
                });
            }

            for(const facility of facilities2) {
                await this.prismaService.facilitys.create({
                    data: {
                        SIGUN_CD: this.handleNullValue(facility.SIGUN_CD),
                        SIGUN_NM: this.handleNullValue(facility.SIGUN_NM),
                        BIZPLC_NM: this.handleNullValue(facility.INST_NM),
                        REFINE_LOTNO_ADDR: this.handleNullValue(facility.REFINE_LOTNO_ADDR),
                        REFINE_ROADNM_ADDR : this.handleNullValue(facility.REFINE_ROADNM_ADDR),
                        REFINE_ZIP_CD : this.handleNullValue(facility.REFINE_ZIP_CD),
                        REFINE_WGS84_LOGT : this.handleNullValue(facility.REFINE_WGS84_LOGT),
                        REFINE_WGS84_LAT : this.handleNullValue(facility.REFINE_WGS84_LAT),
                    }
                });
            }

            return { message: 'Facilities data saved successfully' };
        }
        catch (error) {
            return { message: 'Failed to fetch facilities data' };
        }
    }
}
