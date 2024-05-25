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
    <div>
      <Select>
        <SelectTrigger className="mt-5" name="categoryId">
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
