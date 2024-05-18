import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Home } from "./pages/Home"
import { NavMenu } from "./pages/NavMenu"
import "./App.css"
import { Dashboard } from "./pages/Dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

type GlobalContextType = {
  state: GlobalContext,
  handleAddToCart: (product: Product) => void
}

type GlobalContext = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null);

function App() {
  const [state, setState] = useState<GlobalContext>({
    cart: []
  })
  const handleAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddToCart }}>
        <NavMenu />
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
