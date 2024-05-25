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
import { Link } from "react-router-dom"

export function Home() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddToCart } = context

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
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <div className="Home">
      {/* <section
        className="w-full -mt-14 bg-cover bg-center relative "
        style={{
          backgroundImage: 'url("../src/images/header-image.jpg")',
          height: "50vh"
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            position: "absolute",
            zIndex: "1",
            bottom: "0"
          }}
        ></div>
      </section> */}
      <section
        className="w-full -mt-14 relative "
        style={{
          width: "102%",
          position: "relative",
          paddingBottom: "30%" /* This sets the height to half the width */,
          overflow: "hidden"
        }}
      >
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "98%",
            objectFit: "cover"
          }}
        >
          <source src="../src/video/teaCommercial.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            width: "110%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            position: "absolute",
            zIndex: "1",
            bottom: "0%",
            left: "-5%"
          }}
        ></div>
      </section>

      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <section className="flex flex-col md:flex-row gap-4  w-[100%]  justify-center flex-wrap">
        {products?.length === 0 && <p>No product found, try searching with other name</p>}
        {products?.map((product) => (
          <Card key={product.id} className="w-[250px]">
            <Link to={`/products/${product.id}`}>
              <CardHeader className="p-0">
                <img src={product.image} alt={product.name} className="h-50 rounded-md" />
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.price}SAR</CardDescription>
              </CardHeader>
            </Link>
            <CardContent></CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
