import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { SVGProps, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import UserService from "../api/users"
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

export function AddUser() {
  const queryClient = useQueryClient()

  const [user, setUser] = useState({
    id: "",
    email: "",
    fullName: "",
    phone: "",
    password: "",
    role: "Customer"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleRole = (value: string) => {
    setUser({ ...user, role: value })
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await UserService.createOne(user)
    queryClient.invalidateQueries({ queryKey: ["users"] })
    await handleReset()
  }
  const handleReset = async () => {
    setUser({
      id: "",
      fullName: "",
      phone: "",
      email: "",
      password: "",
      role: "Customer"
    })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Add new User. Click save when you are done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Role</Label>
              <Select defaultValue="Customer" onValueChange={handleRole}>
                <SelectTrigger className="col-span-3" name="role">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="Customer" value="Customer">
                    Customer
                  </SelectItem>
                  <SelectItem key="Admin" value="Admin">
                    Admin
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Full Name</Label>
              <Input
                name="fullName"
                className="col-span-3"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                value={user.fullName}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input
                name="email"
                className="col-span-3"
                type="text"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Password</Label>
              <Input
                name="password"
                className="col-span-3"
                type="text"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phone</Label>
              <Input
                name="phone"
                className="col-span-3"
                type="text"
                placeholder="Phone number"
                onChange={handleChange}
                value={user.phone}
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
