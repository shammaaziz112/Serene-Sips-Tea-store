import { AddCategory } from "@/components/addCategory"
import { AddProduct } from "@/components/addProduct"
import { AddUser } from "@/components/addUser"
import { CategoriesTable } from "@/components/categoriesTable"
import { ProductTable } from "@/components/productTable"
import { UserTable } from "@/components/userTable"

export function Dashboard() {
  return (
    <div >
      <div>
        <AddCategory/>
      </div>
      <div>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">Categories</h1>
        <CategoriesTable />
      </div>
      <AddProduct />
      <div>
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">Products</h1>
        <ProductTable />
      </div>
        <AddUser/>
      <div>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mt-10">User</h1>
        <UserTable />
      </div>
    </div>
  )
}
