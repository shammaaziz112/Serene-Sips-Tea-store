import { useQuery } from "@tanstack/react-query"

import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { Product } from "../types"
import api from "../api"
import { GlobalContext } from "@/App"
import { useContext } from "react"

export function Home() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing")
    const {state, handleAddToCart} = context

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <div className="Home">
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <h3>Cart ({state.cart.length})</h3>
      <section className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto flex-wrap">
        {data?.map((product) => (
          <Card key={product.id} className="w-[250px]">
            <CardHeader>
            <img src={product.image} alt="img" />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription><p>Content</p></CardDescription>
            </CardHeader>
            <CardContent>
            
              
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
