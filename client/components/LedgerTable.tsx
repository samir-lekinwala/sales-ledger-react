import React from 'react'
import * as models from '../models/items'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '../apis/fruits'
import LedgerFooter from './LedgerFooter'
import { dollarOrPercent, calculateFeesTotal } from '../functions/functions.tsx'

interface Props {
  data: models.item[]
}

function LedgerTable(props: Props) {
  const { data } = props
  console.log(data)

  const queryClient = useQueryClient()

  const mutateDeleteTransaction = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })

  // function deleteTransaction(id: number) {
  //   mutateDeleteTransaction.mutate(id)
  //   console.log('deleting item')
  // }

  //confirm if dollar or percent or nothing.
  //if nothing fee is equal to 0
  //if dollar then fee is equal to number it already outputs
  //if percentage then have to calculate the sold price against the percentage
  //value and then put out the output into the price after fees/shipping

  //  function calculateFeesTotal(item: models.item) {
  //     const percentageOrDollar = dollarOrPercent(item)
  //     let fee = 0
  //     const afterFeesAndShipping = item.price - item.shipping - fee
  //     const percentage = item.feePercentage / 100

  //     if (item.soldOrBought === 'sold') {
  //       if (item.platform === 'trademe') return (fee = item.price * 0.079)
  //       else if (percentageOrDollar === 'dollar') return (fee = item.feeDollar)
  //       else if (percentageOrDollar === 'percent')
  //         return (fee = item.price * percentage)
  //       else if (fee === 0) return (fee = 0)
  //     } else if (item.soldOrBought === 'bought') {
  //       return item.price + item.shipping
  //     }

  //     console.log(
  //       'dollar or percent',
  //       percentageOrDollar,
  //       afterFeesAndShipping,
  //       'item',
  //       item,
  //       'fee',
  //       fee,
  //     )

  //     return afterFeesAndShipping
  //   }

  // function dollarOrPercent(input: models.item) {
  //   if (input.feePercentage > 0) return 'percent'
  //   else if (input.feeDollar > 0) return 'dollar'
  //   else return
  // }
  function addItemsToTable(item: models.item) {
    const feeDollarOrPercent = dollarOrPercent(item)
    console.log(feeDollarOrPercent, item.item)
    calculateFeesTotal(item)
    const fee = (item.price - calculateFeesTotal(item) - item.shipping).toFixed(
      2,
    )
    //insert variable to get the total cost based on a function that checks if item is bought or sold.

    return (
      <tr
        key={item.id}
        className="group bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item.item}
          <button
            onClick={() => mutateDeleteTransaction.mutate(item.id)}
            className="opacity-0 group-hover:opacity-100 ml-5 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </th>
        <td className="px-3">{item.created_at}</td>
        <td className="px-3">${item.price}</td>
        <td className="px-3">${item.shipping}</td>
        {/* need to make below into fee */}
        {item.soldOrBought === 'sold' ? (
          <td className="px-3">${fee}</td>
        ) : (
          <td className="px-3">$0.00</td>
        )}
        {item.soldOrBought === 'sold' ? (
          <td className="px-3 text-white">
            $
            {
              calculateFeesTotal(item)
              // item.price - item.shipping - fee
            }
          </td>
        ) : (
          <td className="px-3 text-white">${item.price + item.shipping}</td>
        )}

        <td className="px-3">{item.platform}</td>
        {item.soldOrBought === 'bought' ? (
          <td className="px-3 text-white">Bought</td>
        ) : (
          <td className="px-3 text-rose-600">Sold</td>
        )}
        {/* <td className="px-3">{item.soldOrBought}</td> */}
      </tr>
    )
  }

  return (
    <div>
      <h1 className="text-white">The Ledger</h1>
      <div className="max-h-[calc(85vh-100px)] relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Item
              </th>
              <th className="px-3">Date Created</th>
              <th className="px-3">Price</th>
              <th className="px-3">Shipping</th>
              <th className="px-3">Fee</th>
              <th className="px-3">Price after Fees/Shipping</th>
              <th className="px-3">Platform</th>
              <th className="px-3">Sold / Bought</th>
            </tr>
          </thead>
          <tbody>{data.map((item) => addItemsToTable(item))}</tbody>
        </table>
      </div>
      {/* <LedgerFooter data={data} /> */}
    </div>
  )
}

export default LedgerTable
