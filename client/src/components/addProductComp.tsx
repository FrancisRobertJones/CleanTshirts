import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NewProductDetails } from "@/models/classes/products"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast, useToast } from "@/components/ui/use-toast"
import { ICreateProductRes } from "@/models/interfaces/products"
import { ToastAction } from "@radix-ui/react-toast"


interface IAddProductCompProps {
    fetchAllProducts: () => void
}


const AddProductComp = ({fetchAllProducts}: IAddProductCompProps) => {

    const [newProduct, setNewProduct] = useState<NewProductDetails>(new NewProductDetails("", 0, "", "", "", 0, ""))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        }
        )
    }


    const handleProductSubmit = async () => {
        try {
            const res = await axios.post<ICreateProductRes>("http://localhost:3000/products/create", newProduct)

            if (res.data.newProduct.acknowledged) {
                toast({
                    title: "New product created",
                    description: `Id number ${res.data.newProduct.insertedId}`,
                })
                fetchAllProducts()
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your product creation.",
                  })
            }
        } catch (error) {
            console.log("there has been an error creating the product")
        }

    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Add</Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle>Add a product</SheetTitle>
                    <SheetDescription>
                        Enter new product details below
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ID" className="text-right">
                            ID
                        </Label>
                        <Input id="id" onChange={handleChange} placeholder="ID will be generated automatically" className="col-span-3" disabled />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Input id="status" name="status" onChange={handleChange} placeholder="Status" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" name="name" onChange={handleChange} placeholder="Name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" name="description" onChange={handleChange} placeholder="Description" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image URL
                        </Label>
                        <Input id="image" name="image" onChange={handleChange} placeholder="Image URL" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input id="price" name="price" onChange={handleChange} value={newProduct?.price} placeholder="Price" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Input id="category" name="category" onChange={handleChange} value={newProduct?.category} placeholder="Category" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amountInStock" className="text-right">
                            Num. in Stock
                        </Label>
                        <Input id="amountInStock" name="amountInStock" onChange={handleChange} value={newProduct?.amountInStock} placeholder="Amount in stock" className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleProductSubmit}>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default AddProductComp