import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Home } from "./pages/Home"
import { NavMenu } from "./components/navMenu"
import "./App.css"
import { Dashboard } from "./pages/Dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"
import { ProductDetails } from "./pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavMenu />
        <Home />
      </>
    )
  },
  {
    path: "/dashboard",
    element: (
      <>
        <NavMenu />
        <Dashboard />
      </>
    )
  },
  {
    path: "/products/:productId",
    element: (
      <>
        <NavMenu />
        <ProductDetails />
      </>
    )
  }
])

type GlobalContextType = {
  stateCart: GlobalContext
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}

type GlobalContext = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [stateCart, setStateCart] = useState<GlobalContext>({
    cart: []
  })

  const handleAddToCart = (product: Product) => {
    // *** for Duplicated in cart ***
    // const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    // if (isDuplicated) return
    setStateCart({
      ...stateCart,
      cart: [...stateCart.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const filteredCart = stateCart.cart.filter((item) => item.id !== id)
    setStateCart({
      ...stateCart,
      cart: filteredCart
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ stateCart, handleAddToCart, handleDeleteFromCart }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
