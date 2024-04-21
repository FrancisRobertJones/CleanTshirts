import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EditProduct } from "./editProductComp"
import { IProduct } from '@/models/interfaces/products'
import AddProductComp from "./addProductComp"


interface IProductTableCompoProps {
    allProducts: IProduct[]
    fetchAllProducts: () => void
}

const ProductTable = ({ allProducts, fetchAllProducts }: IProductTableCompoProps) => {
    return (
        <>
            <div className="flex flex-col items-left">
                <h1 className="text-3xl my-12">Products in our catalogue</h1>
                <div className="mb-12"><AddProductComp fetchAllProducts= {fetchAllProducts} /></div>
            </div>


            <Table>
                <TableCaption>A list of products in our catalogue.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">No. in stock</TableHead>
                        <TableHead className="text-right">Edit</TableHead>




                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allProducts.map((product) => {
                        return (
                            <TableRow key={product._id}>
                                <TableCell className="font-medium">{product._id}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell className="text-right">{product.price}</TableCell>
                                <TableCell className="text-right">{product.amountInStock}</TableCell>
                                <TableCell className="text-right"><EditProduct fetchAllProducts={fetchAllProducts} product={product} /></TableCell>
                            </TableRow>)
                    })
                    }



                </TableBody>
            </Table>
        </>

    )
}

export default ProductTable