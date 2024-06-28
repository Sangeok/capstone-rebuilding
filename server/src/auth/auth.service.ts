import axios from 'axios';
import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AuthService {
    async getKakaoUserInfo(
        @Query('code') code: string
    ) {
        try {
            // 1. 액세스 토큰 받기
            const tokenResponse = await this.getKakaoToken(code);
      
            // 2. 사용자 정보 가져오기
            const userInfo = await this.getKakaoUserProfile(tokenResponse.data.access_token);
            const userInfoData = {
                userInfo: userInfo.data,
                kakaoAccessToken: tokenResponse.data.access_token,
            }
            return userInfoData;
        } catch(err) {
            console.error(err);
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
