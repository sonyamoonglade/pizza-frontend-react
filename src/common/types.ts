
export enum AppRoles {
  worker = 'worker',
  master = 'master',
  user = 'user'
}
export enum OrderStatus {
  waiting_for_verification = 'waiting_for_verification',
  verified = 'verified',
  completed = 'completed',
  cancelled = 'cancelled'
}
export interface DeliveryDetails {
  address: string
  entrance_number: number
  floor: number
  flat_call?: number
}

export interface Features {
  weight: number
  energy_value?: number
  volume?: number
  nutrients?: nutrients
}


export interface nutrients{
  carbs: number
  fats: number
  proteins: number
}

export type LocalStorageCartProduct = {
  id: number
  translate: string
  price: number
}

export type DatabaseCartProduct = {
  id: number
  quantity: number
  translate: string
  price: number
}

export interface Product {
  id: number
  category: string
  features: Features
  name: string
  translate: string
  currency: string
  price: number
  description: string
}

export interface Promotion {
  id: number
  title: string
  touched_title: string
  touched_text: string
}

export enum CategoryColor {
  'Напитки' = '#6fbecf',
  'Пицца'  = '#eb5757',
  'Закуски' = '#3cb46e'
}


export interface CartInterface {

  addProduct(product: DatabaseCartProduct): void
  removeProduct(id: number): void
  getById(id: number): DatabaseCartProduct | undefined
  getCart(): DatabaseCartProduct[]
  clearCart(): void
  calculateCartTotalPrice(): number


}
