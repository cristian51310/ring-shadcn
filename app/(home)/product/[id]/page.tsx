import { products } from "@/mocks/products"
import ProductDetail from "./product-detail"

interface IParams {
  id: string
}

const ProductPage = ({ params }: { params: IParams }) => {
  const product = products.find((product) => product.id === params.id)

  return (
    <div className="p-12 pt-8">
      <ProductDetail
        product={product}
      />
    </div>
  )
}

export default ProductPage