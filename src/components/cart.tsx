import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { stateCart, handleDeleteFromCart } = context

  return (
    <Popover>
      <PopoverTrigger>
        <button className="relative">
          <ShoppingCart className="h-7 w-7" />
          <Badge className="absolute -top-1 -right-1 text-xs px-1 rounded-full bg-primary text-white">
            {stateCart.cart.length}
          </Badge>
          <span className="sr-only">Shopping cart</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {stateCart.cart.length === 0 && <p>No items</p>}
          {stateCart.cart.map((product) => {
            return (
              <div className="mb-4 flex items-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-14 h-14 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold">{product.price}</span>
                <Button
                  className=""
                  variant="destructive"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  {" "}
                  X{" "}
                </Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
