import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import "../styles/NavMenu.css"

export function NavMenu() {
  return (
    <div>
      <div className="flex justify-center mt-0" style={{ color: "#CBB59C" }}>
        <NavigationMenu className="text-3xl uppercase mb-9">
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">Shop</NavigationMenuLink>
            </NavigationMenuItem>
            <img src="../src/images/Logo2.png" alt="img" className="w-32" />
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <NavigationMenuLink className="NavItem">Cart</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <section
        className="w-max"
        style={{
          marginTop: "-75px",
          width: "100%",
          backgroundImage: 'url("../src/images/header-image.jpg")',
          height: "650px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            position: "absolute",
            zIndex: "1",
            bottom: "0"
          }}
        ></div>
      </section>
    </div>
  )
}
