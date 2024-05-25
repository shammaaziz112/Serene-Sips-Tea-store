import api from "@/api"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function Search() {
  const queryClient = useQueryClient()

  const [searchParams, setSearchParams] = useSearchParams()
  const deafultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(deafultSearch)

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    queryClient.invalidateQueries({ queryKey: ["products"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }
  return (
    <div>
      <form className="flex-1 relative" onSubmit={handleSearch}>
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          value={searchBy}
          className="pl-9 h-7 w-full text-base rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-50"
          placeholder="Search"
          type="search"
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
