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
import { PrivateRoute } from "./components/privateRoute"

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
      <PrivateRoute>
        <>
          <NavMenu />
          <Dashboard />
        </>
      </PrivateRoute>
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
  handleStoreAddress: (address: DecodedUser) => void
  handleRemoveCart: () => void
  handleRemoveUser: () => void
}

type GlobalContext = {
  cart: Product[]
  user: DecodedUser | null
  address: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalContext>({
    cart: [],
    user: null,
    address: null
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
    const address = localStorage.getItem("address")
    if (address) {
      const decodedUser = JSON.parse(address)
      setState({
        ...state,
        address: decodedUser
      })
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = cart.findIndex((item) => item.id === id)
    cart.splice(index, 1)
    setState({
      ...state,
      cart: cart
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  const handleStoreAddress = (address: DecodedUser) => {
    setState({
      ...state,
      address
    })
  }

  const handleRemoveCart = () => {
    setState({
      ...state,
      cart: []
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
        value={{
          state,
          handleAddToCart,
          handleDeleteFromCart,
          handleStoreUser,
          handleStoreAddress,
          handleRemoveCart,
          handleRemoveUser
        }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App