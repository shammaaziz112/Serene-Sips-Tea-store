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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "../types"
import { ChangeEvent, useState } from "react"
import api from "../api"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteDialog({ product }: { product: Product }) {
  const queryClient = useQueryClient()

  const deleteProducts = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProducts(id)
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
