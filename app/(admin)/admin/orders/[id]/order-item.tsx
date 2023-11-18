import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  products: CartProductType[]
}

<div className="grid grid-cols-5 gap-4 pb-3 items-center">
  <p className="col-span-2">Producto</p>
  <p>Precio</p>
  <p>Cantidad</p>
  <p>Total</p>
</div>

export default function OrderItems({ products }: OrderItemProps) {
  return (
    <Table>
      <TableCaption>Lista de productos que estan en esta orden.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="relative w-20 aspect-square rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </TableCell>
            <TableCell>
              {formatPrice(product.price)}
            </TableCell>
            <TableCell>
              {product.quantity}
            </TableCell>
            <TableCell>
              ${(product.price * product.quantity).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}