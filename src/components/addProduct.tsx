import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { SVGProps, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Category } from "@/types"
import ProductService from "../api/products"
import categoryService from "../api/categories"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
      {/* <form className="w-1/2 mx-auto" onSubmit={handleSubmit} >
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
      </form> */}

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Add new category. Click save when you are done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Category</Label>
              <Select
                defaultValue="3fa85f64-5717-4562-b3fc-2c963f66af16"
                onValueChange={handleCategory}
              >
                <SelectTrigger className="col-span-3" name="categoryId">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input
                name="name"
                className="col-span-3"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                value={product.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Price</Label>
              <Input
                name="price"
                className="col-span-3"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                value={product.price}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Image</Label>
              <Input
                name="image"
                className="col-span-3"
                type="text"
                placeholder="Image"
                onChange={handleChange}
                value={product.image}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Quantity</Label>
              <Input
                name="quantity"
                className="col-span-3"
                type="number"
                placeholder="Quantity"
                onChange={handleChange}
                value={product.quantity}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Description</Label>
              <Input
                name="description"
                className="col-span-3"
                type="text"
                placeholder="Description"
                onChange={handleChange}
                value={product.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
