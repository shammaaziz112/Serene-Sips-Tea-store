import { useQuery } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Product } from "@/types"
import ProductService from "../api/products"

export function Matcha() {
  const provider = useContext(GlobalContext)
  if (!provider) throw Error("Context is missing")
  const { state, handleAddToCart } = provider
  const categoryId = "9304da9b-cac6-4d84-ab4c-656cad89fe7d"
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products", categoryId],
    queryFn: () => ProductService.getProductsById(categoryId)
  })

  return (
    <div className="mt-[10%] mb-[23%] h-1/2">
      <h2 className=" mt-5text-3xl font-bold text-center text-[#313237] mb-6 md:mb-8 lg:mb-10">
        Our Matcha Collection
      </h2>
      <section className="flex flex-col flex-wrap mx-20 md:flex-row gap-4 justify-center max-w-screen-md md:max-w-screen-2xl">
        {data?.map((product) => {
          const products = state.cart.filter((p) => p.id === product.id)
          const inStock = product.quantity > products.length

          return (
            <div key={product.id} className="card">
              <Card key={product.id} className="w-[250px]">
                <Link to={`/products/${product.id}`}>
                  <CardHeader className="p-0">
                    <img alt={product.name} src={product.image} className="h-50 rounded-t-lg" />
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                </Link>
                <CardContent>
                  <p>{product.price} $</p>
                </CardContent>
                <CardFooter>
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
