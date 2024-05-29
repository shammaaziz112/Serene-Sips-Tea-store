import { useQuery } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
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
    <div className="mb-[10%] h-1/2">
      <div className="bg-[#a05540] mb-[2%]">
        <h2 className=" text-neutral-50 text-3xl font-bold text-center py-[4%] ">
          Our Accessories Collection
        </h2>
        <div
          className=""
          style={{
            width: "100%",
            backgroundImage: 'url("images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            zIndex: "1"
          }}
        ></div>
      </div>
      <section className="flex flex-col flex-wrap mx-20 md:flex-row gap-4 justify-center w-fit">
        {data?.map((product) => {
          const products = state.cart.filter((p) => p.id === product.id)
          const inStock = product.quantity > products.length

          return (
            <div key={product.id} className="card">
              <Card key={product.id} className="w-[320px] h-[500px] flex flex-col justify-between">
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
