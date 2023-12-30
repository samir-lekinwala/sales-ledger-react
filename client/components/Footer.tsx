import * as models from '../models/items'

interface Props {
  data: models.item[]
}

function Footer(props: Props) {
  const { data } = props
  console.log('from the ledger', data)

  getTotalBoughtAndSold()

  function getTotalBoughtAndSold() {
    let boughtTotal = 0
    let soldTotal = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].soldOrBought === 'bought') {
        boughtTotal += data[i].price + data[i].shipping
      } else if (data[i].soldOrBought === 'sold') {
        soldTotal += data[i].price
      }
    }
    const totals = { boughtTotal: boughtTotal, soldTotal: soldTotal }
    console.log('totals', totals)
    return totals
  }

  //what to add to footer
  //total number of trades
  //Total profit which comes from total bought - total sold - fees/shipping
  //total cost of shipping/fees

  // use reduce to map over the data and get the bought and sold totals

  // const
  return <div>Footer</div>
}

export default Footer
