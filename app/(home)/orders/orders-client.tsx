"use client"

import { Order, User } from "@prisma/client";

interface ManageOrdersProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User
}

export default function OrdersClient({ orders }: ManageOrdersProps) {

  return (
    <div>
      Ordenes
    </div>
  )
}