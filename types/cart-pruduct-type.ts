export type CartProductType = {
  id: string
  name: string
  description: string
  category: string
  selectedImage: SelectedImgType
  quantity: number
  price: number
}

export type SelectedImgType = {
  id: string
  url: string
}