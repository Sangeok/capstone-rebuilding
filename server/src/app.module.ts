import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacilityModule } from './facility/facility.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FacilityModule,
    AuthModule,
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
