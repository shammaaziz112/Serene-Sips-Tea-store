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
import { Link } from "react-router-dom"
import { Header } from "./header"

export function NavMenu() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handleRemoveUser } = context

  console.log(state)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
  }
  return (
    <div>
      <Header />

      <div className="flex justify-center mt-16 " style={{ color: "#CBB59C" }}>
        <NavigationMenu className="text-3xl uppercase mb-9">
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="/">Tea</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">
                <a href="/products/:productId">Matcha</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <img src="../src/images/Logo1.png" alt="img" className="w-32 mx-4 z-10" />

        <NavigationMenu className="text-3xl uppercase mb-9">
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">Accessories</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">About</NavigationMenuLink>
            </NavigationMenuItem>
 
            {/* <Search /> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
