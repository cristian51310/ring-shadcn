"use client"
import { CartProductType, SelectedImgType } from "@/types/cart-pruduct-type"
import Image from "next/image"

interface ProductImageProps{
  cartProduct: CartProductType
  product: any
  handleImageSelect: (value: SelectedImgType ) => void
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleImageSelect,
}) => {
  return (
    <div className="grid grid-cols-6 grid-rows-4 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col row-span-4 gap-2 cursor-pointer h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: any) => (
          <div
            key={image.id}
            onClick={() => handleImageSelect(image)}
            className={`relative w-full border aspect-square rounded-md  ${cartProduct.selectedImage.id === image.id ? "border-orange-500" : "border-neutral-200"}`}
          >
            <Image
              src={image.url}
              alt="product image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      
      <div className="col-span-5 relative aspect-square">
        <Image
          src={cartProduct.selectedImage.url}
          alt={cartProduct.name}
          fill
          className="w-full h-full object-cover max-h-[500px] min-h-[300px] sm:min-h-[400px] rounded-md"
        />
      </div>
    </div>
  )
}

export default ProductImage