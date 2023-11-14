import { products } from "@/mocks/products"
import CategoryDetail from "./category-detail"

interface IParams {
  id: string
}

export default function CategoryPage({ params }: { params: IParams }) {
  const product = products.find((product) => product.id === params.id)

  return (
    <div className="p-12 pt-8">
      <CategoryDetail />
    </div>
  )
}
