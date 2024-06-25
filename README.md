<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

# Documentação da API da Hamburgueria

## Modelagem
![modelagem](https://github.com/KevynMurilo/api_baby/assets/132490286/eb67711e-3ac8-4615-b204-368468355582)

## Sumário

1. [Introdução](#introdução)
2. [Endpoints](#endpoints)
   - [Mesas](#mesas)
   - [Garçons](#garçons)
   - [Pedidos](#pedidos)
   - [Itens do Pedido](#itens-do-pedido)
   - [Produtos](#produtos)
   - [Categorias](#categorias)
   - [Itens Adicionais](#itens-adicionais)
3. [Modelos de Dados](#modelos-de-dados)
4. [Exemplos de Requisição](#exemplos-de-requisição)

---

## Introdução

Esta documentação descreve os endpoints e modelos de dados para a API RESTful de uma hamburgueria. A API permite que garçons visualizem mesas disponíveis, registrem pedidos, adicionem itens adicionais aos produtos e enviem pedidos para uma dashboard que imprime os pedidos para a cozinha.

## Instalação

```bash
yarn install
```

### Execução do Prisma

```
npx prisma migrate dev
```

> Execute esse comando para rodar as migrations

### Execução

Modo de Inicialização

```bash
yarn start
```

Modo de Observação

```bash
yarn start:dev
```

Modo de Produção

```bash
yarn start:prod
```

## Configuração do Ambiente

Antes de iniciar a aplicação, é crucial configurar corretamente o arquivo `.env` na raiz do projeto. Certifique-se de adicionar as seguintes variáveis de ambiente:

```plaintext
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE_NAME=
DB_SCHEMA=p
PORT=
SECRETKEY=
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE_NAME}?schema=${DB_SCHEMA}"
```
> Essas variáveis são essenciais para conectar e configurar seu banco de dados PostgreSQL, bem como definir configurações importantes para a aplicação.

## Endpoints

### Mesas

#### Listar Mesas

- **URL**: `/mesas`
- **Método**: GET
- **Descrição**: Retorna todas as mesas.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "numero": 1,
      "status": "disponível"
    },
    {
      "id": 2,
      "numero": 2,
      "status": "ocupada"
    }
  ]
  ```

#### Criar Mesa

- **URL**: `/mesas`
- **Método**: POST
- **Descrição**: Cria uma nova mesa.
- **Corpo da Requisição**:
  ```json
  {
    "numero": 3,
    "status": "disponível"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "numero": 3,
    "status": "disponível"
  }
  ```

#### Atualizar Mesa

- **URL**: `/mesas/:id`
- **Método**: PUT
- **Descrição**: Atualiza uma mesa existente.
- **Corpo da Requisição**:
  ```json
  {
    "status": "ocupada"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "numero": 3,
    "status": "ocupada"
  }
  ```

#### Deletar Mesa

- **URL**: `/mesas/:id`
- **Método**: DELETE
- **Descrição**: Deleta uma mesa existente.
- **Resposta**: 204 No Content

### Garçons

#### Listar Garçons

- **URL**: `/garcons`
- **Método**: GET
- **Descrição**: Retorna todos os garçons.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "João",
      "email": "joao@example.com"
    },
    {
      "id": 2,
      "nome": "Maria",
      "email": "maria@example.com"
    }
  ]
  ```

#### Criar Garçom

- **URL**: `/garcons`
- **Método**: POST
- **Descrição**: Cria um novo garçom.
- **Corpo da Requisição**:
  ```json
  {
    "nome": "Carlos",
    "email": "carlos@example.com",
    "senha": "senha123"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "nome": "Carlos",
    "email": "carlos@example.com"
  }
  ```

#### Atualizar Garçom

- **URL**: `/garcons/:id`
- **Método**: PUT
- **Descrição**: Atualiza um garçom existente.
- **Corpo da Requisição**:
  ```json
  {
    "nome": "Carlos Silva"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "nome": "Carlos Silva",
    "email": "carlos@example.com"
  }
  ```

#### Deletar Garçom

- **URL**: `/garcons/:id`
- **Método**: DELETE
- **Descrição**: Deleta um garçom existente.
- **Resposta**: 204 No Content

### Pedidos

#### Listar Pedidos

- **URL**: `/pedidos`
- **Método**: GET
- **Descrição**: Retorna todos os pedidos.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "mesaId": 1,
      "garcomId": 1,
      "horaPedido": "2023-06-25T14:30:00Z",
      "status": "preparando"
    },
    {
      "id": 2,
      "mesaId": 2,
      "garcomId": 2,
      "horaPedido": "2023-06-25T14:45:00Z",
      "status": "entregue"
    }
  ]
  ```

#### Criar Pedido

- **URL**: `/pedidos`
- **Método**: POST
- **Descrição**: Cria um novo pedido.
- **Corpo da Requisição**:
  ```json
  {
    "mesaId": 1,
    "garcomId": 1,
    "horaPedido": "2023-06-25T14:30:00Z",
    "status": "preparando"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "mesaId": 1,
    "garcomId": 1,
    "horaPedido": "2023-06-25T14:30:00Z",
    "status": "preparando"
  }
  ```

#### Atualizar Pedido

- **URL**: `/pedidos/:id`
- **Método**: PUT
- **Descrição**: Atualiza um pedido existente.
- **Corpo da Requisição**:
  ```json
  {
    "status": "entregue"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "mesaId": 1,
    "garcomId": 1,
    "horaPedido": "2023-06-25T14:30:00Z",
    "status": "entregue"
  }
  ```

#### Deletar Pedido

- **URL**: `/pedidos/:id`
- **Método**: DELETE
- **Descrição**: Deleta um pedido existente.
- **Resposta**: 204 No Content

### Itens do Pedido

#### Listar Itens do Pedido

- **URL**: `/itens-do-pedido`
- **Método**: GET
- **Descrição**: Retorna todos os itens dos pedidos.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "pedidoId": 1,
      "produtoId": 1,
      "quantidade": 2,
      "observacoes": "Sem cebola"
    },
    {
      "id": 2,
      "pedidoId": 1,
      "produtoId": 2,
      "quantidade": 1,
      "observacoes": null
    }
  ]
  ```

#### Criar Item do Pedido

- **URL**: `/itens-do-pedido`
- **Método**: POST
- **Descrição**: Cria um novo item do pedido.
- **Corpo da Requisição**:
  ```json
  {
    "pedidoId": 1,
    "produtoId": 1,
    "quantidade": 2,
    "observacoes": "Sem cebola"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "pedidoId": 1,
    "produtoId": 1,
    "quantidade": 2,
    "observacoes": "Sem cebola"
  }
  ```

#### Atualizar Item do Pedido

- **URL**: `/itens-do-pedido/:id`
- **Método**: PUT
- **Descrição**: Atualiza um item do pedido existente.
- **Corpo da Requisição**:
  ```json
  {
    "quantidade": 3,
    "observacoes": "Sem cebola, com queijo"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "pedidoId": 1,
    "produtoId": 1,
    "quantidade": 3,
    "observacoes": "Sem cebola, com queijo"
  }
  ```

#### Deletar Item do Pedido

- **URL**: `/itens-do-pedido/:id`
- **Método**: DELETE
- **Descrição**: Deleta um item do pedido existente.
- **Resposta**: 204 No Content

### Produtos

#### Listar Produtos

- **URL**: `/produtos`
- **Método**: GET
- **Descrição**: Retorna todos os produtos.
- **Resposta**:
  ```json


  [
    {
      "id": 1,
      "categoriaId": 1,
      "nome": "Hambúrguer",
      "descricao": "Hambúrguer de carne",
      "preco": 15.0
    },
    {
      "id": 2,
      "categoriaId": 2,
      "nome": "Batata Frita",
      "descricao": "Porção de batata frita",
      "preco": 10.0
    }
  ]
  ```

#### Criar Produto

- **URL**: `/produtos`
- **Método**: POST
- **Descrição**: Cria um novo produto.
- **Corpo da Requisição**:
  ```json
  {
    "categoriaId": 1,
    "nome": "Hambúrguer Vegano",
    "descricao": "Hambúrguer de soja",
    "preco": 18.0
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "categoriaId": 1,
    "nome": "Hambúrguer Vegano",
    "descricao": "Hambúrguer de soja",
    "preco": 18.0
  }
  ```

#### Atualizar Produto

- **URL**: `/produtos/:id`
- **Método**: PUT
- **Descrição**: Atualiza um produto existente.
- **Corpo da Requisição**:
  ```json
  {
    "preco": 17.0
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "categoriaId": 1,
    "nome": "Hambúrguer Vegano",
    "descricao": "Hambúrguer de soja",
    "preco": 17.0
  }
  ```

#### Deletar Produto

- **URL**: `/produtos/:id`
- **Método**: DELETE
- **Descrição**: Deleta um produto existente.
- **Resposta**: 204 No Content

### Categorias

#### Listar Categorias

- **URL**: `/categorias`
- **Método**: GET
- **Descrição**: Retorna todas as categorias.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Lanches"
    },
    {
      "id": 2,
      "nome": "Bebidas"
    }
  ]
  ```

#### Criar Categoria

- **URL**: `/categorias`
- **Método**: POST
- **Descrição**: Cria uma nova categoria.
- **Corpo da Requisição**:
  ```json
  {
    "nome": "Sobremesas"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "nome": "Sobremesas"
  }
  ```

#### Atualizar Categoria

- **URL**: `/categorias/:id`
- **Método**: PUT
- **Descrição**: Atualiza uma categoria existente.
- **Corpo da Requisição**:
  ```json
  {
    "nome": "Doces"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "nome": "Doces"
  }
  ```

#### Deletar Categoria

- **URL**: `/categorias/:id`
- **Método**: DELETE
- **Descrição**: Deleta uma categoria existente.
- **Resposta**: 204 No Content

### Itens Adicionais

#### Listar Itens Adicionais

- **URL**: `/itens-adicionais`
- **Método**: GET
- **Descrição**: Retorna todos os itens adicionais.
- **Resposta**:
  ```json
  [
    {
      "id": 1,
      "nome": "Queijo Extra",
      "descricao": "Adicional de queijo",
      "preco": 2.0
    },
    {
      "id": 2,
      "nome": "Bacon",
      "descricao": "Adicional de bacon",
      "preco": 3.0
    }
  ]
  ```

#### Criar Item Adicional

- **URL**: `/itens-adicionais`
- **Método**: POST
- **Descrição**: Cria um novo item adicional.
- **Corpo da Requisição**:
  ```json
  {
    "nome": "Cebola Caramelizada",
    "descricao": "Adicional de cebola caramelizada",
    "preco": 1.5
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "nome": "Cebola Caramelizada",
    "descricao": "Adicional de cebola caramelizada",
    "preco": 1.5
  }
  ```

#### Atualizar Item Adicional

- **URL**: `/itens-adicionais/:id`
- **Método**: PUT
- **Descrição**: Atualiza um item adicional existente.
- **Corpo da Requisição**:
  ```json
  {
    "preco": 2.0
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 3,
    "nome": "Cebola Caramelizada",
    "descricao": "Adicional de cebola caramelizada",
    "preco": 2.0
  }
  ```

#### Deletar Item Adicional

- **URL**: `/itens-adicionais/:id`
- **Método**: DELETE
- **Descrição**: Deleta um item adicional existente.
- **Resposta**: 204 No Content

## Modelos de Dados

### Mesa

```json
{
  "id": 1,
  "numero": 1,
  "status": "disponível"
}
```

### Garçom

```json
{
  "id": 1,
  "nome": "João",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

### Pedido

```json
{
  "id": 1,
  "mesaId": 1,
  "garcomId": 1,
  "horaPedido": "2023-06-25T14:30:00Z",
  "status": "preparando"
}
```

### Item do Pedido

```json
{
  "id": 1,
  "pedidoId": 1,
  "produtoId": 1,
  "quantidade": 2,
  "observacoes": "Sem cebola"
}
```

### Produto

```json
{
  "id": 1,
  "categoriaId": 1,
  "nome": "Hambúrguer",
  "descricao": "Hambúrguer de carne",
  "preco": 15.0
}
```

### Categoria

```json
{
  "id": 1,
  "nome": "Lanches"
}
```

### Item Adicional

```json
{
  "id": 1,
  "nome": "Queijo Extra",
  "descricao": "Adicional de queijo",
  "preco": 2.0
}
```

## Exemplos de Requisição

### Listar Mesas

**Requisição**
```http
GET /mesas
```

**Resposta**
```json
[
  {
    "id": 1,
    "numero": 1,
    "status": "disponível"
  },
  {
    "id": 2,
    "numero": 2,
    "status": "ocupada"
  }
]
```

### Criar Pedido

**Requisição**
```http
POST /pedidos
Content-Type: application/json

{
  "mesaId": 1,
  "garcomId": 1,
  "horaPedido": "2023-06-25T14:30:00Z",
  "status": "preparando"
}
```

**Resposta**
```json
{
  "id": 3,
  "mesaId": 1,
  "garcomId": 1,
  "horaPedido": "2023-06-25T14:30:00Z",
  "status": "preparando"
}
```

### Adicionar Item ao Pedido

**Requisição**
```http
POST /itens-do-pedido
Content-Type: application/json

{
  "pedidoId": 1,
  "produtoId": 1,
  "quantidade": 2,
  "observacoes": "Sem cebola"
}
```

**Resposta**
```json
{
  "id": 3,
  "pedidoId": 1,
  "produtoId": 1,
  "quantidade": 2,
  "observacoes": "Sem cebola"
}
```

<div align="center">
<img src="https://cdn.simpleicons.org/nestjs" height="30" alt="nestjs logo"  />
<img src="https://cdn.simpleicons.org/prisma" height="30" alt="nestjs logo"  />
<img src="https://cdn.simpleicons.org/postgresql/" height="30" alt="nestjs logo"  />
</div>

---
