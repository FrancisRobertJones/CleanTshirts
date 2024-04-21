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
import { IProduct } from "@/models/interfaces/products"
import axios from "axios"
import { toast } from "./ui/use-toast"
import { useEffect, useState } from "react"
import { NewProductDetails } from "@/models/classes/products"
import { Switch } from "@/components/ui/switch"
import { CategorySelectComp } from "./categorySelectComp"


interface IEditProductProps {
  product: IProduct,
  fetchAllProducts: () => void
}

export function EditProduct({ product, fetchAllProducts }: IEditProductProps) {
  const [newProduct, setNewProduct] = useState(new NewProductDetails("", 0, "", "", true, 0, ""))
  const [isAvailable, setIsAvailable] = useState(true)
  const [category, setCategory] = useState("")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    }
    )
    console.log(newProduct)

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



  const handleDelete = async () => {
    try {
      const res = await axios.post("http://localhost:3000/products/delete", { productId: product._id })
      console.log("res from deletion", res.data)
      if (res.status === 200) {
        toast({
          title: "Product deleted",
          description: `Id number ${product._id} has been deleted`,
        })
        fetchAllProducts()
      } else if (res.status === 404) {
        toast({
          variant: "destructive",
          title: "Product cannot be found",
          description: `Id number ${product._id} cannot be found`,
        })
        fetchAllProducts()

      }
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your product deletion ${error}`,
      })
    }
  }

  //TODO handle different data types, number etc. 

  const handleEdit = async () => {
    try {
      setNewProduct({ ...newProduct, status: isAvailable })

      const res = await axios.put(`http://localhost:3000/products/update/${product._id}`, newProduct)
      console.log("res from edit", res.data)
      if (res.status === 200) {
        toast({
          title: "Product edited",
          description: `Id number ${product._id} has been edited`,
        })
        fetchAllProducts()
      } else if (res.status === 404) {
        toast({
          variant: "destructive",
          title: "Product cannot be edited",
          description: `Id number ${product._id} cannot be found`,
        })
        fetchAllProducts()

      }
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your product edit ${error}`,
      })
    }
  }





  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit product</SheetTitle>
          <SheetDescription>
            Make changes to the selected product here
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ID" className="text-right">
              ID
            </Label>
            <Input id="id" value={product._id} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Available
            </Label>
            <Switch id="status" checked={isAvailable} onCheckedChange={handleAvailableToggle} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input name={"name"} onChange={handleChange} id="name" placeholder={product.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input name={"description"} onChange={handleChange} id="description" placeholder={product.description} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input name={"image"} onChange={handleChange} id="image" placeholder={product.image} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input name={"price"} onChange={handleChange} id="price" className="col-span-3" />
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
            <Input name={"amountInStock"} onChange={handleChange} id="amountInStock" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleEdit} type="submit">Save changes</Button>
          </SheetClose>
          <Button onClick={handleDelete} variant="destructive">Delete product</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
