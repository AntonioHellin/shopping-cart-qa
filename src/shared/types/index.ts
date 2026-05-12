export interface Product {
  id: string
  name: string
  description: string
  price: number
  emoji: string
}

export interface CartItem extends Product {
  quantity: number
}
