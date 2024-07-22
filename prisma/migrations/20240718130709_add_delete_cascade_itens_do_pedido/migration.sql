-- DropForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" DROP CONSTRAINT "item_do_pedido_has_item_adicional_id_item_adicional_fkey";

-- DropForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" DROP CONSTRAINT "item_do_pedido_has_item_adicional_id_item_do_pedido_fkey";

-- DropForeignKey
ALTER TABLE "itens_do_pedidos" DROP CONSTRAINT "itens_do_pedidos_id_pedido_fkey";

-- DropForeignKey
ALTER TABLE "itens_do_pedidos" DROP CONSTRAINT "itens_do_pedidos_id_produto_fkey";

-- AddForeignKey
ALTER TABLE "itens_do_pedidos" ADD CONSTRAINT "itens_do_pedidos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_do_pedidos" ADD CONSTRAINT "itens_do_pedidos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "protudos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_id_item_do_pedido_fkey" FOREIGN KEY ("id_item_do_pedido") REFERENCES "itens_do_pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_id_item_adicional_fkey" FOREIGN KEY ("id_item_adicional") REFERENCES "itens_adicionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
