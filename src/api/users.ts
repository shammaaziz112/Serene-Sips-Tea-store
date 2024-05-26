import api from "."
import { User } from "../types"

export default {
  getAll: async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
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
  createOne: async (user: User) => {
    try {
      const res = await api.post(`/users/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (id: string) => {
    try {
      const res = await api.delete(`/users/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  updateOne: async (updatedUser: User) => {
    try {
      const res = await api.patch(`/users/${updatedUser.id}`, updatedUser)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
