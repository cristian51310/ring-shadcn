import NullData from "@/components/null-data"
import getProductById from "@/lib/getProductById"
import CategoryDetail from "./category-detail"
import getCategoryById from "@/lib/getCategoryById"

interface IParams {
  id: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const category = await getCategoryById(params)

  if (!category) return <NullData title="No se encontró la categoria" />

  return (
    <div className="p-12 pt-8">
      <CategoryDetail category={category} />
    </div>
  )
}
