import api from "@/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Category, Product, User } from "@/types"
import { EditDialog } from "@/components/editDialog"
import { DeleteDialog } from "@/components/deleteDialog"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    description: "",
    price: 0,
    quantity: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
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

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getCategories = async () => {
    try {
      const res = await api.get("/categories")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
  const { data: categories, error: categoryError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const productWithCat = products?.map((product) => {
    const category = categories?.find((category) => category.id === product.categoryId)

    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }

    return product
  })

  const handleSelect = (e: { target: { value: any } }) => {
    setProduct({
      ...product,
      categoryId: e.target.value
    })
  }

  return (
    <div>
      <form className="mt-3 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight"> Add New Product </h3>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />

        <select
          name="cats"
          onChange={handleSelect}
          className="border-solid rounded-md border p-2 mt-3 w-full mx-auto"
          placeholder="Category"
        >
          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })}
        </select>

        <Input
          name="image"
          className="mt-4"
          type="text"
          placeholder="Image"
          onChange={handleChange}
        />
        <Input
          name="price"
          className="mt-4"
          type="number"
          placeholder="Price"
          onChange={handleChange}
        />
        <Input
          name="quantity"
          className="mt-4"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
        />
        <Input
          name="description"
          className="mt-4"
          type="textarea"
          placeholder="Description"
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
      <div>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">Products</h1>
        <Table className="">
          <TableCaption>A list of your Product.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productWithCat?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell className="text-left">{product.quantity}</TableCell>
                <TableCell className="text-left">{product.categoryId}</TableCell>
                <TableCell className="text-left">
                  <DeleteDialog product={product} />
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">User</h1>
        <Table className="">
          <TableCaption>A list of your Product.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-left">{}</TableCell>
                <TableCell className="text-left">{user.fullName}</TableCell>
                <TableCell className="text-left">{user.email}</TableCell>
                <TableCell className="text-left">{user.role}</TableCell>
                <TableCell className="text-left">
                  {/* <DeleteDialog product={product} />
                  <EditDialog product={product} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
