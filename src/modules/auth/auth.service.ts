import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GarcomService } from '../garcom/garcom.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly garcomService: GarcomService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, senha: string): Promise<{ token: string }> {
    const garcom = await this.garcomService.findOneByEmail(email);
    if (!garcom) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(senha, garcom.senha);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { id: garcom.id, nome: garcom.nome, email: garcom.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
