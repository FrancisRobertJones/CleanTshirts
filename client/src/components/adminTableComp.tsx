import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { IOrderData } from "@/models/interfaces/orders"
import axios from "axios"


const AdminTableComponent = ( ) => {
    const [orderData, setOrders] = useState<IOrderData>()
 
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get<IOrderData>("http://localhost:3000/order/allorders", { withCredentials: true })
            console.log(res, "this is the response from get all orders")
            setOrders(res.data)
        }
        fetchOrders()
    }, [])


    useEffect(() => {
        console.log("here are the orders", orderData)
    }, [orderData])

    return (
        <>
            <div className="flex flex-col items-left">
                <h1 className="text-3xl my-12">Admin - Orders</h1>
                <div className="mb-12"></div>
            </div>


            <Table>
                <TableCaption>Your cart</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                     {orderData && orderData.orders.map((order) => {
                                return (
                                <TableRow key={order._id}>
                                    <TableCell className="font-medium">{order.orderDate}</TableCell>
                                    <TableCell>{order.userId}</TableCell>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.totalPrice}</TableCell>
                                    <TableCell >{order.lineItems.map((item) => {return (
                                        <div key={item.productId}>
                                        <p>{`${item.name} ${item.quantity}`}</p>
                                        </div>
                                    )})}</TableCell>
                                </TableRow>
                            )
                        })}
     
 

                </TableBody>
            </Table >
        </>

    )
}

export default AdminTableComponent