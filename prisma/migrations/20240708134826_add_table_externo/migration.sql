-- CreateEnum
CREATE TYPE "StatusExterno" AS ENUM ('pendente', 'finalizado');

-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_numero_mesa_fkey";

-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "id_externo" INTEGER,
ALTER COLUMN "numero_mesa" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Externo" (
    "id" SERIAL NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "status" "StatusExterno" NOT NULL DEFAULT 'pendente',

    CONSTRAINT "Externo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_numero_mesa_fkey" FOREIGN KEY ("numero_mesa") REFERENCES "mesas"("numero") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_externo_fkey" FOREIGN KEY ("id_externo") REFERENCES "Externo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
