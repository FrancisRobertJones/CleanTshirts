import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { IOrderData, IOrders } from '@/models/interfaces/orders'


const OrdersPage = () => {
    const [orderData, setOrders] = useState<IOrderData>()
 
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get<IOrderData>("http://localhost:3000/order/", { withCredentials: true })
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
                <h1 className="text-3xl my-12">Confirm your order</h1>
                <div className="mb-12"></div>
            </div>

            {/*  TODO include images in checkout table.
     */}
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
            <div className='flex justify-center align-center mt-24'>
                <h4 className='text-l mr-6'>Total price:SEK</h4>

            </div>
        </>

    )
}

export default OrdersPage