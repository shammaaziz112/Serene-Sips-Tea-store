import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { LeafIcon, MenuIcon, ShoppingCartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from "@/components/ui/dropdown-menu"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { Link } from "react-router-dom"
import { ROLE } from "@/types"
import { Cart } from "./cart"
import { Search } from "./search"

export function Header() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-950 shadow fixed w-full top-0 z-20">
      {/* fixed w-full */}
      <Link className="flex items-center gap-2 text-lg font-semibold" to="/">
        {/* <LeafIcon className="w-6 h-6 text-green-500" /> */}
        <img src="../src/images/Logo2.png" alt="img" className="w-10 h-10" />
        <span>Serene Sips</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
          to="/"
        >
          Home
        </Link>
        {state.user?.role === ROLE.Admin && (
          <Link
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            to="/dashboard"
          >
            Dashboard
          </Link>
        )}
        {!state.user && (
          <Link
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            to="/login"
          >
            Login
          </Link>
        )}
        {!state.user && (
          <Link
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            to="/signup"
          >
            Signup
          </Link>
        )}
        {state.user && (
          <Link
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            onClick={handleLogout}
            to="/"
          >
            Logout
          </Link>
        )}

        <Search />
        <Cart />
        {state.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://img.freepik.com/premium-vector/avatar-profile-vector-illustrations-website-social-networks-user-profile-icon_495897-224.jpg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover"
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-6 p-4">
            <Link className="flex items-center gap-2 text-lg font-semibold" to="/">
              <LeafIcon className="w-6 h-6 text-green-500" />
              <span>Blooming.</span>
            </Link>
            <nav className="grid gap-4">
              <Link
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                to="/"
              >
                Home
              </Link>
              {state.user?.role === ROLE.Admin && (
                <Link
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              )}
              {!state.user && (
                <Link
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                  to="/signup"
                >
                  Signup
                </Link>
              )}
              {!state.user && (
                <Link
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                  to="/login"
                >
                  Login
                </Link>
              )}
              {state.user && (
                <Link
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                  to="/"
                >
                  Logout
                </Link>
              )}

              <Link
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                to="/checkout"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Cart</span>
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
