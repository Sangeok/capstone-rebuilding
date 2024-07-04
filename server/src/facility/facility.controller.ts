import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { Facility } from '@prisma/client';

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
        @Body() data: { facility: Facility; userId: string }
    ) {
        return this.facilityService.likeFacility(data.facility, data.userId);
    }

    @Post('unlike')
    async unlikeFacility(
        @Body() data: { facility: Facility; userId: string }
    ) {
        return this.facilityService.unlikeFacility(data.facility, data.userId);
    }
}
