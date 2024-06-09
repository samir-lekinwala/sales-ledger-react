export interface item {
  id: number
  item: string
  price: number
  shipping: number
  feePercentage: number
  feeDollar: number
  platform: string
  soldOrBought: string
  created_at: number
  potentialSalePrice: number
  inventory: boolean
  bought_Id: number
}
export interface editedItem {
  id?: number
  item?: string
  price?: number
  shipping?: number
  feePercentage?: number
  feeDollar?: number
  platform?: string
  soldOrBought?: string
  created_at?: number
  potentialSalePrice?: number
  inventory?: boolean
  bought_Id?: number
}
