import { Category } from "@/types"
import api from "."

export default {
  getAll: async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
  },
  updateOne: async (updatedCategory: Category) => {
    try {
      const res = await api.patch(`/categories/${updatedCategory.id}`, updatedCategory)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (id: string) => {
    try {
      const res = await api.delete(`/categories/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
