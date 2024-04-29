import { CartActionType } from '@/reducers/cartReducer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CartContext } from '@/context/cartContext';
import { IAllProductsResponse, IProduct } from '@/models/interfaces/products';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

const HomePage = () => {

    const [allProducts, setAllProducts] = useState<IProduct[]>([])

    const fetchAllProducts = async () => {
        const response = await axios.get<IAllProductsResponse>("http://localhost:3000/products/")
        setAllProducts(response.data.products)
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const { dispatchCart } = useContext(CartContext)

    const addToCart = (product: IProduct) => {
        toast({
            title: "Product added to cart",
            description: `${product.name} added to cart`,
        })
        dispatchCart({ type: CartActionType.ADDTOCART, payload: product })
      
    }


    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allProducts.map((product) => (
                    <div key={product._id} className="group border p-4 relative">
                        <div className="relative w-full h-auto">
                            <img src={product.image1} alt={`${product.name} Back`} className="w-full h-auto absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
                            <img src={product.image2} alt={`${product.name} Front`} className="w-full h-auto relative transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0" />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                            <div className='flex flex-col items-center'>
                                <span className="text-white text-xl">{product.description}</span>
                                <Button onClick={() => addToCart(product)} className="mt-6 bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black">Add to bag</Button>
                            </div>
                        </div>
                        <div className='flex'>
                            <h4>{product.price}</h4>
                            <h4 className='ml-auto'>{product.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage