import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacilityModule } from './facility/facility.module';

@Module({
  imports: [FacilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
