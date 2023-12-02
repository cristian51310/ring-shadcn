export const formatPrice = (price: number) => {
  if (price === null) return "N/A"

  if (price === 0) return "Gratis"

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2
  }).format(price)
}