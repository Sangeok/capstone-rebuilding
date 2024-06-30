import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private PrismaService: PrismaService) {
        super({
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })
    }

    async validate(payload: any) {
        const { id } = payload;
        const user = await this.PrismaService.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}