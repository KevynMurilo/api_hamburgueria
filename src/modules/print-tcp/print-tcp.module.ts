import { Module } from '@nestjs/common';
import { PrintTcpService } from './print-tcp.service';

@Module({
  providers: [PrintTcpService],
  exports: [PrintTcpService],
})
export class PrintTcpModule {}
