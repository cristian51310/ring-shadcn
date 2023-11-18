// "use client"

// import Status from "@/components/status";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/formatPrice";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Order, User } from "@prisma/client";
// import { EyeOpenIcon } from "@radix-ui/react-icons";
// import moment from "moment";
// import { useRouter } from "next/navigation";
// import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

// interface ManageOrdersProps {
//   orders: ExtendedOrder[];
// }

// type ExtendedOrder = Order & {
//   user: User
// }

// export default function OrdersClient({ orders }: ManageOrdersProps) {
//   const router = useRouter()

//   let rows: any = []

//   if (orders) {
//     rows = orders.map((order) => ({
//       id: order.id,
//       customer: order.user.name,
//       amount: formatPrice(order.amount / 100),
//       paymentStatus: order.status,
//       date: moment(order.createDate).fromNow(),
//       deliveryStatus: order.deliveryStatus,
//     }))
//   }

//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 100 },
//     { field: "customer", headerName: "Cliente Nombre", width: 210 },
//     {
//       field: "amount", headerName: "Total (mxn)", width: 100, renderCell: (params) => (
//         <div className="font-bold">{params.row.amount}</div>
//       )
//     },
//     {
//       field: "paymentStatus", headerName: "Pagado", width: 130, renderCell: (params) => (
//         <div className="font-bold">
//           {params.row.paymentStatus === "pending" ? (
//             <Status
//               text="Pendiente"
//               icon={MdAccessTimeFilled}
//               bg="bg-orange-200"
//               color="text-orange-800"
//             />
//           ) : params.row.paymentStatus === "complete" ? (
//             <Status
//               text="Completado"
//               icon={MdDone}
//               bg="bg-green-200"
//               color="text-green-800"
//             />
//           ) : <></>}
//         </div>
//       )
//     },
//     {
//       field: "deliveryStatus", headerName: "Entregado", width: 130, renderCell: (params) => (
//         <div className="font-bold">
//           {params.row.deliveryStatus === "pending" ? (
//             <Status
//               text="Pendiente"
//               icon={MdAccessTimeFilled}
//               bg="bg-slate-200"
//               color="text-slate-800"
//             />
//           ) : params.row.deliveryStatus === "dispatched" ? (
//             <Status
//               text="Despachado"
//               icon={MdDeliveryDining}
//               bg="bg-purple-200"
//               color="text-purple-800"
//             />
//           ) : params.row.deliveryStatus === "delivered" ? (
//             <Status
//               text="Entregado"
//               icon={MdDone}
//               bg="bg-green-200"
//               color="text-green-800"
//             />
//           ) : <></>}
//         </div>
//       )
//     },
//     {
//       field: "date", headerName: "Fecha", width: 130
//     },
//     {
//       field: "action", headerName: "Acciones", width: 220, renderCell: (params) => (
//         <div className="flex justify-between items-center gap-2">
//           <Button variant="outline" size="icon"
//             onClick={() => router.push(`/admin/orders/${params.row.id}`)}
//           >
//             <EyeOpenIcon className="h-4 w-4" />
//           </Button>
//         </div>
//       )
//     }
//   ]

//   return (
//     <div>
//       <div style={{ height: 600, width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 10 },
//             },
//           }}
//           pageSizeOptions={[10, 20]}
//           checkboxSelection
//           disableRowSelectionOnClick
//           disableColumnMenu
//         />
//       </div>
//     </div>

//   )
// }