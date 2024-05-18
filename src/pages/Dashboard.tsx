import api from "@/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryClient } from "@tanstack/react-query"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    description: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value,
      image:
        "https://static9.depositphotos.com/1001033/1134/i/950/depositphotos_11349000-stock-photo-cup-of-coffe.jpg",
      description: "string"
    })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"> Add New Product </h3>

      <Input name="name" className="mt-4" type="text" placeholder="Name" onChange={handleChange} />
      <Input
        name="categoryId"
        className="mt-4"
        type="text"
        placeholder="Category"
        onChange={handleChange}
      />

      <div className="flex justify-around">
        <Button className="mt-4" type="submit">
          Submit
        </Button>
        <Button className="mt-4" type="reset" variant="outline">
          Reset
        </Button>
      </div>
    </form>
  )
}
