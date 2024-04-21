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

interface IEditProductProps {
  product: IProduct,
  fetchAllProducts: () => void
}

export function EditProduct({ product, fetchAllProducts }: IEditProductProps) {

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
    
    }} catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your product deletion ${error}`,
      })
    }
  }

//TODO sort editing functions for product editing



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
              Status
            </Label>
            <Input id="status" placeholder={product.status} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder={product.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" placeholder={product.description} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input id="image" placeholder={product.image} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" placeholder={product.price.toString()} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" placeholder={product.category} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amountInStock" className="text-right">
              Num. in Stock
            </Label>
            <Input id="amountInStock" placeholder={product.amountInStock.toString()} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
          <Button onClick={handleDelete} variant="destructive">Delete product</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
