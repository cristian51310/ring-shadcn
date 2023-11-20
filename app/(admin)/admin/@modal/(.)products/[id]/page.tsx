import Modal from "@/components/modal/modal";
import NullData from "@/components/null-data";
import { Separator } from "@/components/ui/separator";
import getProductById from "@/lib/getProductById";
import Image from "next/image";

interface IParams {
  id: string
}

export default async function ProductModal({ params }: { params: IParams }) {
  const product = await getProductById(params)

  if (!product) return <NullData title="No se encontró el producto" />

  return (
    <Modal>
      <div className="flex flex-col md:flex-row w-full gap-14">

        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="relative w-[400px] h-[400px] aspect-square object-cover rounded-md"
        />

        <div className="flex flex-col w-1/2">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <Separator />
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-lg">{product.description}</p>
        </div>
      </div>
    </Modal>
  )
}