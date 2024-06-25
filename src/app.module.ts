import { Module } from '@nestjs/common';
import { GarcomModule } from './modules/garcom/garcom.module';
import { PrismaModule } from './modules/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MesaModule } from './modules/mesa/mesa.module';

@Module({
  imports: [GarcomModule, PrismaModule, AuthModule, MesaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
