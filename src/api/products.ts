import api from "."
import { Product } from "../types"

export default {
  getAll: async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  createOne: async (product: Product) => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  updateOne: async (updatedProduct: Product) => {
    try {
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }, 
  getProductsById: async (id: string | undefined) => {
    try {
      const res = await api.get(`/products/section/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

}
