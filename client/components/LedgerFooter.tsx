import { useEffect, useState } from 'react'
import * as models from '../models/items'

import { calculateFeesTotal } from '../functions/functions.tsx'

interface Props {
  data: models.item[]
}

function LedgerFooter(props: Props) {
  const [boughtAndSold, setBoughtAndSold] = useState({
    boughtTotal: 0,
    soldTotal: 0,
    profit: 0,
  })

  // const [totalValues, setTotalValues] = useState()

  const { data } = props
  // console.log('from the ledger', data)

  // const queryClient = useQueryClient()
  useEffect(() => {
    //reruns totalboughtandsold when data changes
    getTotalBoughtAndSold()
    getTotalValueOfItems()
  }, [data])

  function getTotalBoughtAndSold() {
    let boughtTotal = 0
    let soldTotal = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].soldOrBought === 'bought') {
        boughtTotal += calculateFeesTotal(data[i])
      } else if (data[i].soldOrBought === 'sold') {
        soldTotal += calculateFeesTotal(data[i])
      }
    }
    const totals = {
      boughtTotal: boughtTotal.toFixed(2),
      soldTotal: soldTotal.toFixed(2),
      profit: (soldTotal - boughtTotal).toFixed(2),
    }
    setBoughtAndSold(totals)
    return totals
  }

  function getTotalValueOfItems() {
    let totalValueOfInventory = 0

    for (let i = 0; i < data.length; i++) {
      if (data[i].soldOrBought === 'bought') {
        totalValueOfInventory += data[i].potentialSalePrice
      }
    }
    return totalValueOfInventory
  }
  //what to add to footer
  //total number of trades
  //Total profit which comes from total bought - total sold - fees/shipping
  //total cost of shipping/fees

  // use reduce to map over the data and get the bought and sold totals

  // const
  return (
    <div>
      {/* <h1>Footer</h1> */}
      <div className=" max-h-min w-full fixed bottom-0 overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
          <thead>
            <tr className="text-[12px] bg-[#EEEEEE] text-[#222831] uppercase">
              <th
                scope="col"
                className="px-2 py-3 has-tooltip"
                data-tooltip-target="total-transactions"
              >
                Trades
                <div
                  data-tooltip="total-transactions"
                  data-tooltip-placement="top"
                  className="normal-case tooltip absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                >
                  Total number of transactions made
                </div>
              </th>
              <th scope="col" className="px-2 py-3">
                Inventory
              </th>
              <th data-tooltip-target="total-sold" className="has-tooltip">
                Sold
                <div
                  data-tooltip="total-sold"
                  data-tooltip-placement="top"
                  className="normal-case tooltip absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
                >
                  Price after fees/shipping
                </div>
              </th>
              <th>Bought</th>
              <th>Profit</th>
              {/* <th>Platform</th>
              <th>Bought</th> */}
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item) => ( */}
            <tr className="bg-[#31363F] text-[12px] border-t dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-3 py-4 font-medium text-white whitespace-nowrap dark:text-white"
              >
                {data.length}
              </th>
              <th
                scope="row"
                className="px-3 py-4 font-medium text-white whitespace-nowrap dark:text-white"
              >
                {'$' + getTotalValueOfItems()}
              </th>
              <th
                scope="row"
                className="py-4 font-medium text-white whitespace-nowrap dark:text-white"
              >
                {`$${boughtAndSold?.soldTotal}`}
              </th>
              <th
                scope="row"
                className="py-4 font-medium text-white whitespace-nowrap dark:text-white"
              >
                {`$${boughtAndSold?.boughtTotal}`}
              </th>
              <th
                scope="row"
                className="py-4 font-medium text-white whitespace-nowrap dark:text-white"
              >
                {`$${boughtAndSold?.profit}`}
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
