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
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  }
])

type GlobalContextType = {
  state: GlobalContext
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}

type GlobalContext = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalContext>({
    cart: []
  })

  const handleAddToCart = (product: Product) => {
    // *** for Duplicated in cart ***
    // const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    // if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const filteredCart= state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddToCart, handleDeleteFromCart }}>
        <NavMenu />
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
