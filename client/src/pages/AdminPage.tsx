import { useEffect, useState } from 'react'
import axios from 'axios'
import { IAllProductsResponse, IProduct } from '@/models/interfaces/products'
import ProductTableComp from '../components/productTableComp'
import AdminTableComponent from '@/components/adminTableComp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const AdminPage = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([])

  const fetchAllProducts = async () => {
    const response = await axios.get<IAllProductsResponse>("http://localhost:3000/products/")
    setAllProducts(response.data.products)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <>
      <div>

        <Tabs defaultValue="Products">
          <TabsList className="flex flex items-center mt-12">
            <TabsTrigger className='w-full' value="Products">Products</TabsTrigger>
            <TabsTrigger className='w-full' value="Orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="Products">
            <ProductTableComp
              allProducts={allProducts}
              fetchAllProducts={fetchAllProducts}
            />
          </TabsContent>
          <TabsContent value="Orders">
            <AdminTableComponent />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}


export default AdminPage