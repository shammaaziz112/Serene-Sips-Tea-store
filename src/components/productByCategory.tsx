import { useQuery } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Product } from "@/types"
import ProductService from "../api/products"

export function ProductByCategory({ categoryId }: { categoryId: string }) {
  const provider = useContext(GlobalContext)
  if (!provider) throw Error("Context is missing")
  const { state, handleAddToCart } = provider

  const { data, error } = useQuery<Product[]>({
    queryKey: ["products", categoryId],
    queryFn: () => ProductService.getProductsById(categoryId)
  })
  let displayProduct = []
  if (data?.length >= 4) {
    displayProduct = data?.slice(0, 5)
  } else {
    displayProduct = data
  }
  return (
    <div>
      <section className="flex flex-col md:flex-row gap-4 justify-between w-full mx-auto">
        {displayProduct?.map((product) => {
          const products = state.cart.filter((p) => p.id === product.id)
          const inStock = product.quantity > products.length

          return (
            <div key={product.id} className="card">
              <Card key={product.id} className="w-[320px] h-[500px] flex flex-col justify-between">
                <Link to={`/products/${product.id}`}>
                  <CardHeader className="p-0">
                    <img alt={product.name} src={product.image} className="h-[40vh] rounded-t-lg" />
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    {/* <CardDescription>{product.description}</CardDescription> */}
                  </CardHeader>
                </Link>
                <CardContent className="mt-2 text-lg">
                  <p>{product.price} SAR</p>
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
