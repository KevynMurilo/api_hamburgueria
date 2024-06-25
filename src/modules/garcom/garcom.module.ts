import { Module } from '@nestjs/common';
import { GarcomService } from './garcom.service';
import { PrismaService } from '../database/prisma.service';
import { GarcomRepository } from './garcom.repository';
import { GarcomController } from './garcom.controller';

@Module({
  providers: [GarcomService, GarcomRepository, PrismaService],
  controllers: [GarcomController],
  exports: [GarcomService],
})
export class GarcomModule {}
