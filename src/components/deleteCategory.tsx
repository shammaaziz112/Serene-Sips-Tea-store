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
import { Label } from "@/components/ui/label"
import { Category } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import categoryService from "../api/categories"

export function DeleteCategory({ category }: { category: Category }) {
  if (!category) throw Error("No User delete")

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await categoryService.deleteOne(category.id)
    queryClient.invalidateQueries({ queryKey: ["categories"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you absolutely sure you want to delete <b>{category.name}</b> ?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">
              This action can not be undone.
              <br />
              This will permanently delete the category and remove it from the server.
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              handleDelete()
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
