import React, { useContext } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CartContext } from '@/context/cartContext'
import { IProduct } from '@/models/interfaces/products'
import { convertToCartProduct } from '@/utils/convertToCartProduct'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { AuthContext } from '@/context/authContext'

const Checkout = () => {

    const { cartItems, removeFromCart } = useContext(CartContext)
    const { authedUser } = useContext(AuthContext)

    const handleSubmitOrder = async () => {
        try {
            const res = await axios.post("http://localhost:3000/order/create", {}, { withCredentials: true })
            console.log("submitted order", res.data)
            handleCheckout()
        } catch (error) {
            console.log("problem submitting order", error)
        }
    }


    const handleCheckout = async () => {
        if (authedUser.loggedIn) {
            handleSubmitOrder()
            const totalPrice = handleTotal()
            try {
                const res = await axios.post("http://localhost:3000/payments/create-session", { totalPrice }, { withCredentials: true })
                const stripeCheckout = res.data.url
                window.location = stripeCheckout
            } catch (error) {
                console.log("issues submitting orderdata", error)
            }
        } else {
            toast({
                title: "Please log in",
                description: "To proceed to checkout",
            })
        }
    }

    const handleRemoveFromCart = (product: IProduct) => {
        const cartProduct = convertToCartProduct(product)
        removeFromCart(cartProduct)
        toast({
            title: "Product removed from cart",
            description: ` ${product.name} removed from cart`,
        })
    }

    const handleTotal = () => {
        return cartItems.reduce((totalPrice, item) => {
            return totalPrice + (item.product.price * item.quantity)
        }, 0)
    }



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
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {cartItems.map((item) => {
                        return (
                            <TableRow>
                                <TableCell className="font-medium">{item.product.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.product.description}</TableCell>
                                <TableCell >{item.product.price}</TableCell>
                                <TableCell ><button onClick={() => handleRemoveFromCart(item.product)} className="text-xs h-6 bg-white text-black border border-black px-3 py-1 hover:bg-black hover:text-white">
                                    Remove
                                </button></TableCell>
                            </TableRow>
                        )
                    })}



                </TableBody>
            </Table >
            <div className='flex justify-center align-center mt-24'>
                <h4 className='text-l mr-6'>Total price:SEK{handleTotal()}</h4>
                <Button onClick={handleCheckout}>Continue</Button>
            </div>
        </>

    )
}

export default Checkout