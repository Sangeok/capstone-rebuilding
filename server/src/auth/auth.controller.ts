import { AuthService } from './auth.service';
import axios from 'axios';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Get('kakao/callback')
    async getKakaoUserInfo(
        @Query('code') code: string
    ) {
        return await this.AuthService.getKakaoUserInfo(code);
    }
}
