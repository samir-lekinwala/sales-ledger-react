import { useEffect, useState } from 'react'
import * as models from '../models/items'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

interface Props {
  data: models.item[]
}

function LedgerFooter(props: Props) {
  const [boughtAndSold, setBoughtAndSold] = useState({
    boughtTotal: 0,
    soldTotal: 0,
    profit: 0,
  })

  const { data } = props
  console.log('from the ledger', data)

  // const queryClient = useQueryClient()
  useEffect(() => {
    //reruns totalboughtandsold when data changes
    getTotalBoughtAndSold()
  }, [data])

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
    const totals = {
      boughtTotal: boughtTotal,
      soldTotal: soldTotal,
      profit: boughtTotal - soldTotal,
    }
    console.log('totals', totals)
    setBoughtAndSold(totals)
    console.log('state', boughtAndSold)
    return totals
  }

  //what to add to footer
  //total number of trades
  //Total profit which comes from total bought - total sold - fees/shipping
  //total cost of shipping/fees

  // use reduce to map over the data and get the bought and sold totals

  // const
  return (
    <div>
      <h1>Footer</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number of transactions
              </th>
              <th>Total Sold</th>
              <th>Total Bought</th>
              <th>Profit</th>
              {/* <th>Platform</th>
              <th>Bought</th> */}
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item) => ( */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.length}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {boughtAndSold?.soldTotal}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {boughtAndSold?.boughtTotal}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {boughtAndSold?.profit}
              </th>
              {/* <td>{item.created_at}</td>
                <td>{item.price}</td>
                <td>{item.shipping}</td>
                <td>{item.platform}</td>
                <td>{item.soldOrBought}</td> */}
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LedgerFooter
