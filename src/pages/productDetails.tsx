import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import api from "@/api"
import { Product } from "@/types"

export function ProductDetails() {
  const params = useParams()

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  console.log("Product", product)
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mt-10">details</h1>
      <h3 className="mt-6">{product.name}</h3>
      <img src={product.image} alt={product.name} className="h-48 w-48 self-center" />
      <h3 className="mt-6">{product.description}</h3>
    </div>
  )
}
