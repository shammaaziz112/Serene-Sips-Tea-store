import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { SVGProps, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
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

export function AddCategory() {
  const queryClient = useQueryClient()

  const [category, setCategory] = useState({
    id: "",
    name: "",
    description: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setCategory({ ...category, [name]: value })
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // e.preventDefault()
    await categoryService.createOne(category)
    await handleReset()
    queryClient.invalidateQueries({ queryKey: ["categories"] })
  }
  const handleReset = async () => {
    setCategory({
      id: "",
      name: "",
      description: ""
    })
  }
  return (
    <>
      {/* <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Add new category
        </h2>

        <Input
          name="name"
          className="mt-5"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={category.name}
        />
        <Input
          name="description"
          className="mt-5"
          type="text"
          placeholder="Description"
          onChange={handleChange}
          value={category.description}
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
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Add new Gategory. Click save when you are done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input
                name="name"
                className="col-span-3"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                value={category.name}
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
                value={category.description}
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
