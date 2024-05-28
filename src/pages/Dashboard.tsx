import { AddCategory } from "@/components/addCategory"
import { AddProduct } from "@/components/addProduct"
import { AddUser } from "@/components/addUser"
import { CategoriesTable } from "@/components/categoriesTable"
import { ProductTable } from "@/components/productTable"
import { UserTable } from "@/components/userTable"
import { Link } from "react-router-dom"
import { SVGProps, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from "@/components/ui/dropdown-menu"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from "@/components/ui/table"
import { Category, Product, User } from "@/types"
import { useQuery } from "@tanstack/react-query"
import categoryService from "../api/categories"
import ProductService from "../api/products"
import UserService from "../api/users"
import { EditCategory } from "@/components/editCategory"
import { DeleteCategory } from "@/components/deleteCategory"
import { EditProduct } from "@/components/editProduct"
import { DeleteProduct } from "@/components/deleteProduct"
import { EditUser } from "@/components/editUser"
import { DeleteUser } from "@/components/deleteUser"
export function Dashboard() {
  const { data: categories, error: categoriesError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: categoryService.getAll
  })

  const { data: products, error: productsError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  const { data: users, error: usersError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UserService.getAll
  })

  const categoriesIds = categories?.reduce((acc, category) => {
    return {
      ...acc,
      [category.id]: category.name
    }
  }, {} as { [key: string]: string })

  const productsWithCat = products?.map((product) => {
    if (categoriesIds) {
      const category = categoriesIds[product.categoryId]
      if (category) {
        return {
          ...product,
          categoryId: category
        }
      }
    }
    return product
  })

  //   return (
  //     <div >
  //       <div>
  //         <AddCategory/>
  //       </div>
  //       <div>
  //         <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">Categories</h1>
  //         <CategoriesTable />
  //       </div>
  //       <AddProduct />
  //       <div>
  //         <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">Products</h1>
  //         <ProductTable />
  //       </div>
  //         <AddUser/>
  //       <div>
  //       <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">User</h1>
  //         <UserTable />
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="grid min-h-screen w-full ">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <PackageIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products?.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                <FolderIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories?.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users?.length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            <div className="border shadow-sm rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-left">Description</TableHead>
                    <TableHead className="text-right">
                      <AddCategory />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories?.map((category) => (
                    <TableRow className="text-left" key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-left">{category.description}</TableCell>
                      <TableCell className="flex justify-around text-right">
                        <EditCategory category={category} />
                        <DeleteCategory category={category} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {categoriesError && <p className="text-red-500">{categoriesError.message}</p>}
            </div>

            <div className="border shadow-sm rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-left">CategoryId</TableHead>
                    <TableHead className="text-left">Price</TableHead>
                    <TableHead className="text-left">Quantity</TableHead>
                    <TableHead className="text-right">
                      <AddProduct />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsWithCat?.map((product) => (
                    <TableRow className="text-left" key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-left">{product.categoryId}</TableCell>
                      <TableCell className="text-left">{product.price}</TableCell>
                      <TableCell className="text-left">{product.quantity}</TableCell>
                      <TableCell className="flex justify-around text-right">
                        <EditProduct product={product} />
                        <DeleteProduct product={product} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {productsError && <p className="text-red-500">{productsError.message}</p>}
            </div>

            <div className="border shadow-sm rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-left">Email</TableHead>
                    <TableHead className="text-left">Role</TableHead>
                    <TableHead className="text-right">
                      <AddUser />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow className="text-left" key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell className="text-left">{user.email}</TableCell>
                      <TableCell className="text-left">{user.role}</TableCell>
                      <TableCell className="flex justify-around text-right">
                        <EditUser user={user} />
                        <DeleteUser user={user} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {usersError && <p className="text-red-500">{usersError.message}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function FolderIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function LineChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}

function Package2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
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

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function ShoppingCartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
