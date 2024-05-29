import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import "./App.css"
import { Dashboard } from "./pages/Dashboard"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { ProductDetails } from "./pages/productDetails"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { PrivateRoute } from "./components/routes/privateRoute"
import { NavBar } from "./components/navBar"
import Footer from "./components/footer"
import { Tea } from "./pages/Tea"
import { Matcha } from "./pages/Matcha"
import { Accessories } from "./pages/Accessories"
import About from "./pages/About"
import { Shop } from "./pages/Shop"
import Contact from "./pages/Contact"
import FAQ from "./pages/FAQ"
import Policy from "./pages/Policy"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
        <Footer />
      </>
    )
  },
  {
    path: "/Shop",
    element: (
      <>
        <NavBar />
        <Shop />
        <Footer />
      </>
    )
  },
  {
    path: "/Tea",
    element: (
      <>
        <NavBar />
        <Tea />
        <Footer />
      </>
    )
  },
  {
    path: "/Matcha",
    element: (
      <>
        <NavBar />
        <Matcha />
        <Footer />
      </>
    )
  },
  {
    path: "/Accessories",
    element: (
      <>
        <NavBar />
        <Accessories />
        <Footer />
      </>
    )
  },
  {
    path: "/About",
    element: (
      <>
        <NavBar />
        <About />
        <Footer />
      </>
    )
  },
  {
    path: "/Contact",
    element: (
      <>
        <NavBar />
        <Contact />
        <Footer />
      </>
    )
  },
  {
    path: "/FAQ",
    element: (
      <>
        <NavBar />
        <FAQ />
        <Footer />
      </>
    )
  },
  {
    path: "/Policy",
    element: (
      <>
        <NavBar />
        <Policy />
        <Footer />
      </>
    )
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <>
          <NavBar />
          <Dashboard />
          <Footer />
        </>
      </PrivateRoute>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar />
        <Login />
        <Footer />
      </>
    )
  },
  {
    path: "/signup",
    element: (
      <>
        <NavBar />
        <Signup />
        <Footer />
      </>
    )
  },
  {
    path: "/products/:productId",
    element: (
      <>
        <NavBar />
        <ProductDetails />
        <Footer />
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
    <div className="App mt-14">
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
