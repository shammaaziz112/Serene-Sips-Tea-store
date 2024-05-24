import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import "../styles/NavMenu.css"
import { Cart } from "./cart"
import { Search } from "./search"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"

export function NavMenu() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  console.log(state)

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    handleRemoveUser()
  }
  return (
    <div>
      <div className="flex justify-center mt-0 ml-80" style={{ color: "#CBB59C" }}>
        <NavigationMenu className="text-3xl uppercase mb-9">
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="/">Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="/products/:productId">Tea</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {!state.user && (<NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="/signup">Signup</a>
              </NavigationMenuLink>
            </NavigationMenuItem>)}
            {state.user && (<NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="">Logout</a>
              </NavigationMenuLink>
            </NavigationMenuItem>)}
          </NavigationMenuList>
        </NavigationMenu>
        <img src="../src/images/Logo2.png" alt="img" className="w-32 z-10" />
        <NavigationMenu className="text-3xl uppercase mb-9">
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">About</NavigationMenuLink>
            </NavigationMenuItem>
            {state.user?.role === ROLE.Admin && (<NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="/dashboard">Dashboard</a>
              </NavigationMenuLink>
            </NavigationMenuItem>)}
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <Cart />
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Search />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
