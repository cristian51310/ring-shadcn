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
    <div className="py-6 px-6 sm:py-6 sm:px-20 md:py-6 md:px-20 lg:py-8 lg:px-32 xl:px-40">
      <ProductDetail product={product} />
    </div>
  )
}
