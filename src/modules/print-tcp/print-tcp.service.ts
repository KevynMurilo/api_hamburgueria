import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class PrintTcpService {
  private client: net.Socket;
  private readonly logger = new Logger(PrintTcpService.name);
  private connected: boolean = false;
  private reconnectInterval: number = 5000;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.client?.removeAllListeners();
    this.client = new net.Socket();

    this.client.connect(9090, '192.168.0.105', () => {
      this.logger.log('Conectado ao servidor TCP');
      this.connected = true;
    });

    this.client.on('error', (err) => {
      this.logger.error(`Erro na comunicação TCP: ${err.message}`);
      this.connected = false;
      this.scheduleReconnect();
    });

    this.client.on('close', () => {
      this.logger.warn('Conexão TCP fechada.');
      this.connected = false;
      this.scheduleReconnect();
    });

    this.client.on('timeout', () => {
      this.logger.error('A conexão TCP expirou.');
      this.client.destroy();
      this.connected = false;
      this.scheduleReconnect();
    });

    this.client.on('data', (data) => {
      const response = data.toString().trim();
      if (response.startsWith('Erro ao conectar na impressora')) {
        this.logger.error(
          'Erro ao conectar na impressora - Error: Can not find printer',
        );
      } else {
        this.logger.log(`Dados recebidos do servidor TCP: ${response}`);
      }
    });
  }

  private scheduleReconnect() {
    if (!this.connected) {
      this.logger.log(
        `Tentando reconectar em ${this.reconnectInterval / 1000} segundos...`,
      );
      this.reconnectTimeout = setTimeout(
        () => this.connect(),
        this.reconnectInterval,
      );
    }
  }

  async sendPedido(pedido: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        this.logger.error('A conexão TCP não está disponível.');
        return reject('A conexão TCP não está disponível.');
      }

      this.client.write(JSON.stringify(pedido), (err) => {
        if (err) {
          this.logger.error(
            `Erro ao enviar dados para o servidor TCP: ${err.message}`,
          );
          return reject(
            `Erro ao enviar dados para o servidor TCP: ${err.message}`,
          );
        }
      });

      this.client.once('data', (data) => {
        resolve(data.toString());
      });

      this.client.once('error', (err) => {
        this.logger.error(`Erro na comunicação TCP: ${err.message}`);
        reject(`Erro na comunicação TCP: ${err.message}`);
      });
    });
  }

  isConnected(): boolean {
    return this.connected;
  }

  async sendToPrinter(pedidoCompleto: any) {
    const printResponse = await this.sendPedido(pedidoCompleto);

    if (
      printResponse ===
      'Erro ao conectar na impressora - Error: Can not find printer'
    ) {
      return { message: 'Erro ao enviar para a impressora.' };
    }
  }
}
