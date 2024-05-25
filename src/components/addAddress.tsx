import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useContext, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import addressService from "../api/addresses"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "@/App"
import { reshapeUser } from "@/lib/utils"
import jwt from "jwt-decode"

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Add new address
        </h3>

        <Input
          name="country"
          className="mt-5"
          type="text"
          placeholder="Country"
          onChange={handleChange}
          value={address.country}
        />
        <Input
          name="city"
          className="mt-5"
          type="text"
          placeholder="City"
          onChange={handleChange}
          value={address.city}
        />
        <Input
          name="street"
          className="mt-5"
          type="text"
          placeholder="Street"
          onChange={handleChange}
          value={address.street}
        />
        <Input
          name="zip_code"
          className="mt-5"
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
      </form>
    </>
  )
}
