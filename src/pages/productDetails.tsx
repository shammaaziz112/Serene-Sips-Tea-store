import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

import api from "@/api"
import { Product } from "@/types"
import { useContext } from "react"
import { GlobalContext } from "@/App"

export function ProductDetails() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context
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
    <div className="bg-gray-100 dark:bg-gray-900 -mt-14 py-12 md:py-16 lg:py-20">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ">{product.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">{product.description}</p>

            <div className="flex items-center mb-8">
              <span className="text-4xl font-bold mr-4">{product.price}SAR</span>
              <Button size="lg" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GI1nZ7FCEX6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Button } from "@/components/ui/button"
// import { CardContent, Card } from "@/components/ui/card"

// export default function Component() {
//   return (
//     <>
//       <div className="bg-gray-100 dark:bg-gray-900 py-12 md:py-16 lg:py-20">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
//             <div>
//               <img
//                 alt="Product Image"
//                 className="w-full h-auto rounded-lg shadow-lg"
//                 height={600}
//                 src="/placeholder.svg"
//                 style={{
//                   aspectRatio: "600/600",
//                   objectFit: "cover",
//                 }}
//                 width={600}
//               />
//             </div>
//             <div className="flex flex-col justify-center">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Acme Premium Headphones</h1>
//               <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
//                 Experience the ultimate in sound quality and comfort with our Acme Premium Headphones.
//               </p>
//               <div className="flex items-center mb-8">
//                 <div className="flex items-center space-x-1">
//                   <StarIcon className="w-5 h-5 fill-primary" />
//                   <StarIcon className="w-5 h-5 fill-primary" />
//                   <StarIcon className="w-5 h-5 fill-primary" />
//                   <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
//                   <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
//                 </div>
//                 <span className="text-gray-500 dark:text-gray-400 ml-4">4.3 (125 reviews)</span>
//               </div>
//               <div className="flex items-center mb-8">
//                 <span className="text-4xl font-bold mr-4">$99.99</span>
//                 <Button size="lg">Add to Cart</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
