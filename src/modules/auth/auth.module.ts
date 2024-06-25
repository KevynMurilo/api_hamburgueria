import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GarcomModule } from '../garcom/garcom.module';

@Module({
  imports: [
    GarcomModule,
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
