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
import { User } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import UserService from "../api/users"

export function DeleteUser({ user }: { user: User }) {
  if (!user) throw Error("No User delete")

  const queryClient = useQueryClient()

  const handleDeleteUser = async (id: string) => {
    await UserService.deleteOne(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
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
          <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}