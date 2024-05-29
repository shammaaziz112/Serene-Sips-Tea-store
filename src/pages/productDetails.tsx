import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

import api from "@/api"
import { Product } from "@/types"
import { useContext, useState } from "react"
import { GlobalContext } from "@/App"

export function ProductDetails() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleAddToCart } = context
  const params = useParams()

  const { cart } = state
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const { id } = useParams<string>()

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [key: string]: Product[] })

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

  let updatedProductQuantity = product.quantity

  Object.keys(groups).forEach((key) => {
    const products = groups[key]
    const foundProductId = key == id
    if (foundProductId) {
      updatedProductQuantity = product.quantity - products.length
    }
  })

  const products = state.cart.filter((p) => p.id === product.id)

  const inStock = product.quantity > products.length

  let availableQuantity = 0
  if (updatedProductQuantity) {
    availableQuantity = updatedProductQuantity < 5 ? updatedProductQuantity : 5
  }
  const select = [...Array(availableQuantity).keys()]

  return (
    <div className=" dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <img
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
              height={600}
              src={product.image}
              style={{
                aspectRatio: "600/600",
                objectFit: "cover"
              }}
              width={600}
            />
          </div>
          <div className="flex flex-col justify-center text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{product.name}</h1>
            <span className="text-4xl font-bold mb-8">{product.price} SAR</span>

            <div className="flex flex-col items-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">{product.description}</p>
              <Button
                className="w-full"
                disabled={!inStock}
                onClick={() => handleAddToCart(product)}
              >
                {inStock ? "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
