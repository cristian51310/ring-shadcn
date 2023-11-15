import NullData from "@/components/null-data"
import getProductById from "@/lib/getProductById"
import ProductDetail from "./product-detail"

interface IParams {
  id: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const product = await getProductById(params)

  if (!product) return <NullData title="No se encontró el producto" />

  return (
    <div className="p-12 pt-8">
      <ProductDetail product={product} />
    </div>
  )
}
