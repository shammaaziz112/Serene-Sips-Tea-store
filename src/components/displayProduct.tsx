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
import { Link } from "react-router-dom"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import ProductService from "../api/products"

export function DisplayProduct() {
  const provider = useContext(GlobalContext)
  if (!provider) throw Error("Context is missing")
  const { state, handleAddToCart } = provider

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })
  return (
    <div className="mt-[10%] mb-[20%]">
      <h2 className="text-2xl uppercase mb-10">Products</h2>
      <section className="flex flex-col md:flex-row gap-4  w-[100%] mt-14 justify-center flex-wrap">
        {data?.map((product) => {
          const products = state.cart.filter((p) => p.id === product.id)
          const inStock = product.quantity > products.length

          return (
            <div key={product.id} className="card">
              <Card key={product.id} className="w-[300px]">
                <Link to={`/products/${product.id}`}>
                  <CardHeader className="p-0">
                    <img alt={product.name} src={product.image} className="h-50 rounded-md" />
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                </Link>
                <CardContent>
                  <p>{product.price} $</p>
                </CardContent>
                <CardFooter>
                  {/* <Button >
                <Link to={`/products/${product.id}`}>Details</Link>
              </Button> */}
                  <Button
                    className="w-full"
                    disabled={!inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    {inStock ? "Add to cart" : "Out of stock"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
