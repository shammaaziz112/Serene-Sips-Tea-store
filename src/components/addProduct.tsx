import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Category } from "@/types"
import ProductService from "../api/products"
import categoryService from "../api/categories"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export function AddProduct() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    id: "",
    name: "",
    categoryId: "",
    image: "",
    quantity: 0,
    price: 0,
    description: ""
  })

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: categoryService.getAll
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setProduct({ ...product, [name]: value })
  }
  const handleCategory = (value: string) => {
    setProduct({ ...product, categoryId: value })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await ProductService.createOne(product)
    queryClient.invalidateQueries({ queryKey: ["products"] })
    // await handleReset()  
  }
  // const handleReset = async () => {
  //   setProduct({
  //     id: "",
  //     name: "",
  //     categoryId: product.categoryId,
  //     image: "",
  //     quantity: 0,
  //     price: 0,
  //     description: ""
  //   })
  // }

  return (
    <>
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit} >
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Add new product
        </h2>

        <Select defaultValue="3fa85f64-5717-4562-b3fc-2c963f66af16" onValueChange={handleCategory}>
          <SelectTrigger className="mt-5" name="categoryId">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category: Category) => {
              return (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        <Input
          name="name"
          className="mt-5"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={product.name}
        />
        <Input
          name="price"
          className="mt-5"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          value={product.price}
        />
        <Input
          name="image"
          className="mt-5"
          type="text"
          placeholder="Image"
          onChange={handleChange}
          value={product.image}
        />
        <Input
          name="quantity"
          className="mt-5"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
          value={product.quantity}
        />
        <Input
          name="description"
          className="mt-5"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <div className="flex justify-evenly">
          <Button className="mt-5 mx-1 w-2/3" type="submit">
            Add
          </Button>
          <Button className="mt-5 mx-1 w-2/3" type="reset">
            Reset
          </Button>
        </div>
      </form>
    </>
  )
}
