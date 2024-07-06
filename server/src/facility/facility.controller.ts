import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { Facility, WishList } from '@prisma/client';

@Controller('facility')
export class FacilityController {
    constructor(private readonly facilityService: FacilityService) {}

    @Get()
    async getFacilities() {
        return this.facilityService.getFacilities();
    }

    @Get('fetch-and-save')
    async fetchAndSaveFacilities() {
        return this.facilityService.fetchAndSaveFacilities();
    }

    @Post('like')
    async likeFacility(
        @Body() data: { facilityId: string; userId: string }
    ) {
        return this.facilityService.likeFacility(data.facilityId, data.userId);
    }

    @Post('unlike')
    async unlikeFacility(
        @Body() data: { facilityId: string; userId: string }
    ) {
        return this.facilityService.unlikeFacility(data.facilityId, data.userId);
    }

    @Post('wishList')
    async getWishList(@Body() body: { wishListData: WishList[] }) {
        return this.facilityService.getWishList(body.wishListData);
    }
}
