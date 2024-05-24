import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Product } from "../types"
import api from "../api"
import ProductService from "../api/products"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteProduct({ product }: { product: Product }) {
  const queryClient = useQueryClient()

  const handleDeleteProduct = async (id: string) => {
    await ProductService.deleteOne(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you done.
          </DialogDescription>
        </DialogHeader>
        <p>Do you really want to delete?</p>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
