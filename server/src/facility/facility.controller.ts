import { Controller, Get, Post } from '@nestjs/common';
import { FacilityService } from './facility.service';

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
}
