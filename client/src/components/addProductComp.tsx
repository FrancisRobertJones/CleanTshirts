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
import { NewProduct } from "@/models/classes/products"
import axios from "axios"
import { useState } from "react"


const AddProductComp = () => {

    const [newProduct, setNewProduct] = useState<NewProduct>(new NewProduct("", "", 0, "", "", "", 0, ""))


    //TODO Sort state update and submission of data 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        }
        )
    }

    const handleProductSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:3000/products/create", newProduct)
            console.log(res, "here is the response")
        } catch(error) {
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
                        <Input id="status" onChange={handleChange} value={newProduct?.status} placeholder="Status" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" onChange={handleChange} value={newProduct?.name} placeholder="Name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" onChange={handleChange} value={newProduct?.description} placeholder="Description" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image URL
                        </Label>
                        <Input id="image" onChange={handleChange} value={newProduct?.image} placeholder="Image URL" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input id="price" onChange={handleChange} value={newProduct?.price} placeholder="Price" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Input id="category" onChange={handleChange} value={newProduct?.category} placeholder="Category" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amountInStock" className="text-right">
                            Num. in Stock
                        </Label>
                        <Input id="amountInStock" onChange={handleChange} value={newProduct?.amountInStock} placeholder="Amount in stock" className="col-span-3" />
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