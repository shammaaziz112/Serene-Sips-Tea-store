import { Category } from "@/types"
import api from "."

export default {
  getAll: async () => {
    try {
      const res = await api.get("/categories")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  createOne: async (category: Category) => {
    try {
      const res = await api.post("/categories", category)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
