import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Home } from "./pages/Home"
import { NavMenu } from "./components/navMenu"
import "./App.css"
import { Dashboard } from "./pages/Dashboard"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { ProductDetails } from "./pages/productDetails"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"

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
    path: "/login",
    element: (
      <>
        <NavMenu />
        <Login />
      </>
    )
  },
  {
    path: "/signup",
    element: (
      <>
        <NavMenu />
        <Signup />
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
  state: GlobalContext
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void
}

type GlobalContext = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalContext>({
    cart: [],
    user: null
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

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
    const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{ state, handleAddToCart, handleDeleteFromCart, handleStoreUser, handleRemoveUser }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
