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
import { Switch } from "@/components/ui/switch"
import { CategorySelectComp } from "./categorySelectComp"



interface IAddProductCompProps {
    fetchAllProducts: () => void
}


const AddProductComp = ({ fetchAllProducts }: IAddProductCompProps) => {

    const [newProduct, setNewProduct] = useState<NewProductDetails>(new NewProductDetails("", 0, "", "", "", false, 0, ""))
    const [isAvailable, setIsAvailable] = useState(false)
    const [category, setCategory] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        }
        )
    }

    const handleAvailableToggle = (newState: boolean) => {
        setIsAvailable(newState);
        setNewProduct({ ...newProduct, status: newState })

    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)
    }

    useEffect(() => {
        setNewProduct({ ...newProduct, category: category })
    }, [category])



    const handleProductSubmit = async () => {
        try {

            const res = await axios.post<ICreateProductRes>("http://localhost:3000/products/create", newProduct)
            console.log(res)

            if (res.data.insertResult.acknowledged) {
                toast({
                    title: "New product created",
                    description: `Id number ${res.data.insertResult.insertedId}`,
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
                        <Switch
                            id="example-switch"
                            checked={isAvailable}
                            onCheckedChange={handleAvailableToggle}
                            aria-label="Toggle feature"
                        />
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
                        <Label htmlFor="image1" className="text-right">
                            Image1URL
                        </Label>
                        <Input id="image1" name="image1" onChange={handleChange} placeholder="Image1 URL" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image2" className="text-right">
                            Image2URL
                        </Label>
                        <Input id="image2" name="image2" onChange={handleChange} placeholder="Image2 URL" className="col-span-3" />
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
                        <CategorySelectComp handleCategoryChange={handleCategoryChange} />
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