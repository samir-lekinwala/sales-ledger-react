import React from 'react'
import * as models from '../models/items.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '../apis/fruits'
import moment from 'moment'

interface Props {
  data: models.item[]
}

export default function InventoryTable(props: Props) {
  const { data } = props

  const queryClient = useQueryClient()

  const mutateDeleteTransaction = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })

  function addItemsToTable(item: models.item) {
    // const feeDollarOrPercent = dollarOrPercent(item)
    // console.log(feeDollarOrPercent, item.item)
    // calculateFeesTotal(item)
    // const fee = (item.price - calculateFeesTotal(item) - item.shipping).toFixed(
    //   2,
    // )
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
        <td className="px-3">{moment(item.created_at).format('lll')}</td>
        <td className="px-3">${item.price}</td>
        <td className="px-3">${item.shipping}</td>
        {/* need to make below into fee */}

        <td className="px-3 text-white">${item.price + item.shipping}</td>
        <td className="px-3 text-white">${item.potentialSalePrice}</td>
        <td className="px-3">{item.platform}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1 className="text-white">Inventory</h1>
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
              <th className="px-3">Price after Fees/Shipping</th>
              {/* <div className="has-tooltip"> */}
              <th className="px-3 has-tooltip">
                Value
                <div className="text-white rounded-lg tooltip -mt-8 shadow-lg bg-opacity-50 bg-black p-1">
                  The potential sale price of item
                </div>
              </th>

              {/* </div> */}

              <th className="px-3">Platform</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: models.item) =>
              item.soldOrBought === 'bought' ? addItemsToTable(item) : null,
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
