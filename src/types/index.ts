export type Product = {
  id: string
  name: string
  categoryId: string
  image: string
  description: string
  price: number
  quantity: number
}

export type Category = {
  id: string
  name: string
  description: string
}

export type User = {
  id: string
  fullName: string
  phone: number
  email: string
  password: string
  role: string
}

export type Address = {
  id: string,
  country: string,
  city: string,
  street: string,
  zip_code: string
}

export type OrderItem = {
  quantity: number
  productId: string
}
export type OrderCheckout = {
  addressId: string
  items: OrderItem[]
}

export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}
