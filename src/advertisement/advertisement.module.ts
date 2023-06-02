import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AdvertisementService],
  controllers: [AdvertisementController],
  imports: [PrismaModule],
})
export class AdvertisementModule {}
