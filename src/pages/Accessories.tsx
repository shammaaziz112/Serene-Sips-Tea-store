import { useQuery } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Product } from "@/types"
import ProductService from "../api/products"

export function Accessories() {
  const provider = useContext(GlobalContext)
  if (!provider) throw Error("Context is missing")
  const { state, handleAddToCart } = provider
  const categoryId = "d5415f10-680e-475a-b929-e399a9db488a"
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products", categoryId],
    queryFn: () => ProductService.getProductsById(categoryId)
  })

  return (
    <div className="mt-[10%] mb-[23%] h-1/2">
      <h2 className=" mt-5text-3xl font-bold text-center text-[#313237] mb-6 md:mb-8 lg:mb-10">
        Our Accessories Collection
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
