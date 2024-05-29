import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { SVGProps, useContext, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import addressService from "../api/addresses"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "@/App"
import { reshapeUser } from "@/lib/utils"
import jwt from "jwt-decode"
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

export function AddAddress() {
  const navigate = useNavigate()
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleStoreAddress } = context
  const queryClient = useQueryClient()

  const [address, setAddress] = useState({
    id: "",
    country: "",
    city: "",
    street: "",
    zip_code: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress({ ...address, [name]: value })
  }

  const handleReset = async () => {
    setAddress({
      id: "",
      country: "",
      city: "",
      street: "",
      zip_code: ""
    })
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const token = await addressService.createOne(address)
    if (token) {
      const decodedToken = jwt(token)
      const address = reshapeUser(decodedToken)
      localStorage.setItem("token", token)
      localStorage.setItem("address", JSON.stringify(address))

      handleStoreAddress(address)
      navigate("/")

      await addressService.createOne(address)
      await handleReset()
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
    }
  }

  return (
    <>
      {/* <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Add new address
        </h3>

        <Input
          name="country"
         className="col-span-3"
          type="text"
          placeholder="Country"
          onChange={handleChange}
          value={address.country}
        />
        <Input
          name="city"
          className="col-span-3"
          type="text"
          placeholder="City"
          onChange={handleChange}
          value={address.city}
        />
        <Input
          name="street"
          className="col-span-3"
          type="text"
          placeholder="Street"
          onChange={handleChange}
          value={address.street}
        />
        <Input
          name="zip_code"
          className="col-span-3"
          type="text"
          placeholder="Zip Code"
          onChange={handleChange}
          value={address.zip_code}
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
            Add Address
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>Add new Address. Click save when you are done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Country</Label>
              <Input
                name="country"
                className="col-span-3"
                type="text"
                placeholder="Country"
                onChange={handleChange}
                value={address.country}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">City</Label>
              <Input
                name="city"
                className="col-span-3"
                type="text"
                placeholder="City"
                onChange={handleChange}
                value={address.city}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Street</Label>
              <Input
                name="street"
                className="col-span-3"
                type="text"
                placeholder="Street"
                onChange={handleChange}
                value={address.street}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Zip Code</Label>
              <Input
                name="zip_code"
                className="col-span-3"
                type="text"
                placeholder="Zip Code"
                onChange={handleChange}
                value={address.zip_code}
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
