import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriaRepository } from './categoria.repository';

@Injectable()
export class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const verify = await this.categoriaRepository.findByName(
      createCategoriaDto.nome,
    );
    if (verify) {
      throw new ConflictException('Nome já cadastrado');
    }
    return this.categoriaRepository.create(createCategoriaDto);
  }

  async findAll() {
    const categorias = await this.categoriaRepository.findAll();
    if (categorias.length === 0) {
      throw new NotFoundException('Nenhuma categoria encontrada');
    }
    return categorias;
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne(id);
    if (!categoria) throw new NotFoundException(`Categoria não encontrada`);
    return categoria;
  }

  async update(id: number, nome: string) {
    const verify = await this.categoriaRepository.findByName(nome);
    if (verify) throw new ConflictException('Nome já cadastrado');

    const categoria = await this.categoriaRepository.findOne(id);
    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    return await this.categoriaRepository.update(id, nome);
  }

  async delete(id: number) {
    const categoria = await this.categoriaRepository.findOne(id);
    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    await this.categoriaRepository.delete(id);
    return { message: `Categoria ${categoria.nome} deletado com sucesso` };
  }
}
