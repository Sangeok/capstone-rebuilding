import { PrismaService } from './../../prisma/prisma.service';
import axios from 'axios';
import { Injectable, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserWithWishList } from 'type';

@Injectable()
export class AuthService {
  constructor(
    private PrismaService: PrismaService,
    private jwtService: JwtService
  ) {}
    async getKakaoUserInfo(
        @Query('code') code: string
    ) {
        try {
            const tokenResponse = await this.getKakaoToken(code);
      
            const userInfo = await this.getKakaoUserProfile(tokenResponse.data.access_token);

            let user: UserWithWishList | null = await this.findUser(userInfo.data.id.toString());

            console.log('user:', user);

            if(!user) {
                user = await this.PrismaService.user.create({
                    data: {
                        id: userInfo.data.id.toString(),
                        nickname: userInfo.data.properties.nickname,
                    },
                    include: { wishList: true }
                })
                console.log(user);
            }

            const userPayload = { id: user.id, nickname: user.nickname };
            const accessToken = this.jwtService.sign(userPayload);
            
            const userInfoData = {
                id: user.id,
                nickname: user.nickname,
                accessToken: accessToken,
                ...(user.wishList && { wishList: user.wishList })
            }

            return userInfoData;
        } catch(err) {
            console.error(err);
        }
    }

    private async findUser(id: string): Promise<UserWithWishList | null> {
      try {
        const user = await this.PrismaService.user.findUnique({
          where: { id },
          include: { wishList: true }
        });
  
        console.log(user);
  
        return user;
      } catch(error) {
        console.error('Error finding user:', error);
        return null;
      }
    }

    private async getKakaoToken(code: string) {
        return axios.post('https://kauth.kakao.com/oauth/token',
          null,
          {
            params: {
              grant_type: 'authorization_code',
              client_id: process.env.KAKAO_REST_API_KEY,
              redirect_uri: process.env.KAKAO_REDIRECT_URI,
              code: code,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }
        );
      }
    
      private async getKakaoUserProfile(accessToken: string) {
        return axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
}
