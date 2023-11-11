export const products = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "Pizza Margerina",
    description: "Pizza Margerina hecha con mucho amor",
    price: 2999,
    category: "Pizza",
    inStock: true,
    images: [
      {
        id: "lsdksunmv",
        url: "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg"
      },
      {
        id: "ncbxvsjqi",
        url: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
      }
    ],
    reviews: [],
  },
  {
    id: "64a4ebe300900d44bb50628a",
    name: "Hamburgesa Doble",
    description: "Hamburgesa Doble con queso y papas",
    price: 102.99,
    category: "Hamburgesa",
    inStock: true,
    images: [
      {
        id: "shsdhsdjsd",
        url: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
      },
      {
        id: "sgshauehs",
        url: "https://cdn.pixabay.com/photo/2016/05/25/10/43/hamburger-1414423_1280.jpg"
      }
    ],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4ebe300900d44bb50628a",
        rating: 5,
        comment: "good",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image: "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "648437b38c44d52b9542e340",
    name: "Shushi de salmon",
    description: "Shushi de salmon con arroz",
    price: 40,
    category: "Shushi",
    inStock: true,
    images: [
      {
        id: "1",
        url: "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_1280.jpg"
      },
      {
        id: "2",
        url: "https://cdn.pixabay.com/photo/2014/05/26/14/53/sushi-354628_1280.jpg"
      }
    ],
    reviews: [
      {
        id: "6499b4887402b0efd394d8f3",
        userId: "6499b184b0e9a8c8709821d3",
        productId: "648437b38c44d52b9542e340",
        rating: 4,
        comment:
          "good enough. I like the camera and casing. the delivery was fast too.",
        createdDate: "2023-06-26T15:53:44.483Z",
        user: {
          id: "6499b184b0e9a8c8709821d3",
          name: "Chaoo",
          email: "example1@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
          hashedPassword: null,
          createdAt: "2023-06-26T15:40:52.558Z",
          updatedAt: "2023-06-26T15:40:52.558Z",
          role: "USER",
        },
      },
      {
        id: "6499a110efe4e4de451c7edc",
        userId: "6475af156bad4917456e6e1e",
        productId: "648437b38c44d52b9542e340",
        rating: 5,
        comment: "I really liked it!!",
        createdDate: "2023-06-26T14:30:40.998Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
];