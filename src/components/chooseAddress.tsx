import { Address } from "@/types"
import addressService from "../api/addresses"
import { useQuery } from "@tanstack/react-query"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select"

export function ChooseAddres() {
  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["categories"],
    queryFn: addressService.getAll
  })
  return (
    <div className="grow mr-3">
      <Select >
        <SelectTrigger className="col-span-3" name="categoryId">
          <SelectValue placeholder="Addres" />
        </SelectTrigger>
        <SelectContent>
          {addresses?.map((address: Address) => {
            return (
              <SelectItem key={address.id} value={address.id}>
                {address.country}, {address.city}, {address.street}, {address.zip_code}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
