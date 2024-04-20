import { useEffect, useState } from 'react'
import axios from 'axios'
import { IAllProductsResponse, IProduct } from '@/models/interfaces/products'
import ProductTableComp from '../components/productTableComp'

const AdminPage = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await axios.get<IAllProductsResponse>("http://localhost:3000/products/")
      setAllProducts(response.data.products)
    }
    fetchAllProducts()
  }, [])

  return (
    <>
      <div>
        <ProductTableComp 
          allProducts={allProducts}
        />
      </div>
    </>
  )
}


export default AdminPage