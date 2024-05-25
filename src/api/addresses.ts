import api from "."
import { Address } from "../types"

export default {
  getAll: async () => {
    try {
      const token = localStorage.getItem("token")
          const res = await api.get("/addresses", {
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
  createOne: async (address: Address) => {
    try {
      const token = localStorage.getItem("token")
          const res = await api.post("/addresses", address, {
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
  deleteOne: async (id: string) => {
    try {
      const token = localStorage.getItem("token")
          const res = await api.delete(`/addresses/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
