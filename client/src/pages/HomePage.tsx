import { Button } from '@/components/ui/button';
import React from 'react'

const HomePage = () => {

    const products = [
        {
            id: 1,
            title: 'T-shirt Front',
            imageFront: '../../public/samso1F.jpeg',
            imageBack: '../../public/samso1B.jpeg',
            price: "200SEK",
            details: 'Details of T-shirt 1'
        },
        {
            id: 2,
            title: 'T-shirt Front',
            imageFront: '../../public/samso2F.jpeg',
            imageBack: '../../public/samso2B.jpeg',
            price: "200SEK",
            details: 'Details of T-shirt 2'
        },
        {
            id: 3,
            title: 'T-shirt Front',
            imageFront: '../../public/samso3F.jpeg',
            imageBack: '../../public/samso3B.jpeg',
            price: "200SEK",
            details: 'Details of T-shirt 3'
        },
        {
            id: 4,
            title: 'T-shirt Front',
            imageFront: '../../public/samso4F.jpeg',
            imageBack: '../../public/samso4B.jpeg',
            price: "200SEK",
            details: 'Details of T-shirt 4'
        },
        {
            id: 5,
            title: 'T-shirt Front',
            imageFront: '../../public/samso5F.jpeg',
            imageBack: '../../public/samso5b.jpeg',
            price: "200SEK",
            details: 'Details of T-shirt 5'
        },
        {
            id: 6,
            title: 'T-shirt Front',
            imageFront: '../../public/samso6F.jpeg',
            imageBack: '../../public/samso6B.jpeg',
            price: "200SEK",
            details: 'Details of T-shirt 6'
        },

    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 mt-4">the clean t-shirt company</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="group border p-4 relative">
                        <div className="relative w-full h-auto">
                            <img src={product.imageBack} alt={`${product.title} Back`} className="w-full h-auto absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
                            <img src={product.imageFront} alt={`${product.title} Front`} className="w-full h-auto relative transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0" />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                            <div className='flex flex-col items-center'>
                                <span className="text-white text-xl">{product.details}</span>
                                <Button className="mt-6 bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black">Add to bag</Button>
                            </div>
                        </div>
                        <div className='flex'>
                        <h4>{product.price}</h4>
                        <h4 className='ml-auto'>{product.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage