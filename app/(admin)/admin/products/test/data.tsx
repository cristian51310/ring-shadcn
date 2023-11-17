export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Product = {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
  category: string
}

export const products = [
  {
    id: "1",
    name: "Apple Watch Series 6",
    price: 399,
    image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Apple Watch SE",
    price: 279,
    image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "3",
    name: "Apple Watch Series 3",
    price: 199,
    image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    inStock: false,
    category: "Electronics",
  },
  {
    id: "4",
    name: "Apple Watch Nike",
    price: 399,
    image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-04.jpg",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "5",
    name: "Apple Watch Hermès",
    price: 1249,
    image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-05.jpg",
    inStock: true,
    category: "Electronics",
  },
  {
    id: "6",
    name: "Apple Watch Series 6",
    price: 399,
    image: "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    inStock: true,
    category: "Electronics",
  },
]

export const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
]
