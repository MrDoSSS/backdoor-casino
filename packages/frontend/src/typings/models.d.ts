export interface ProductTier {
  _id: string
  cost: number
  name: string
  order: number
}

export interface Product {
  _id: string
  tier: string
  name: string
  subtitle: string
  icon: string
}

export interface Reward {
  _id: string
  address: string
  login: string
  password: string
  key: string
  product: Product
  createdAt: Date
  updatedAt: Date
}
