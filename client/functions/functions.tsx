import * as models from '../models/items'

export function calculateFeesTotal(item: models.item) {
  const percentageOrDollar = dollarOrPercent(item)
  const soldOrBought = itemSoldOrBought(item)
  // console.log(soldOrBought)
  const fee = 0
  const percentage = item.feePercentage / 100
  const afterFeesAndShipping = item.price - item.shipping - fee

  if (item.soldOrBought === 'sold') {
    console.log('sold')
    return calculateIfItemSold(item)
  } else if (item.soldOrBought === 'bought') {
    return item.price + item.shipping
  }
  return afterFeesAndShipping
}

export function dollarOrPercent(input: models.item) {
  if (input.feePercentage > 0) return 'percent'
  else if (input.feeDollar > 0) return 'dollar'
  else return
}

export function itemSoldOrBought(item: models.item) {
  if (item.soldOrBought === 'sold') return 'sold'
  else if (item.soldOrBought === 'bought') return 'bought'
}

export function calculateIfItemSold(item: models.item) {
  const percentageOrDollar = dollarOrPercent(item)
  let fee = 0
  const percentage = item.feePercentage / 100

  if (item.platform === 'trademe') fee = item.price * 0.079
  else if (percentageOrDollar === 'dollar') fee = item.feeDollar
  else if (percentageOrDollar === 'percent') fee = item.price * percentage
  else if (fee === 0) fee = 0

  const afterFeesAndShipping = item.price - item.shipping - fee
  return afterFeesAndShipping
}