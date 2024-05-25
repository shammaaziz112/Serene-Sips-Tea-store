import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import api from "@/api"
import { useQueryClient } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import UserService from "../api/users"

export function AddUser() {
  const queryClient = useQueryClient()

  const [user, setUser] = useState({
    id: "",
    email: "",
    fullName: "",
    phone: 0,
    password: "",
    role: "Customer"
  })
  // id: string
  // fullName: string
  // phone: number
  // email: string
  // role: string

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleRole = (value: string) => {
    setUser({ ...user, role: value })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    UserService.createOne(user)
    await handleReset()
    queryClient.invalidateQueries({ queryKey: ["Users"] })
  }
  const handleReset = async () => {
    setUser({
      id: "",
      fullName: "",
      phone: 0,
      email: "",
      password: "",
      role: "Customer"
    })
  }

  return (
    <>
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Add new User
        </h2>

        <Select defaultValue="Customer" onValueChange={handleRole}>
          <SelectTrigger className="mt-5" name="role">
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

        <Input
          name="fullName"
          className="mt-5"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={user.fullName}
        />
        <Input
          name="email"
          className="mt-5"
          type="text"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
        <Input
          name="password"
          className="mt-5"
          type="text"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
        <Input
          name="phone"
          className="mt-5"
          type="number"
          placeholder="Phone number"
          onChange={handleChange}
          value={user.phone}
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
