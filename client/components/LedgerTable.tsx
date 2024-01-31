import React from 'react'
import * as models from '../models/items'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '../apis/fruits'
import LedgerFooter from './LedgerFooter'

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

  return (
    <div>
      <h1 className="text-white">The Ledger</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item
              </th>
              <th>Date Created</th>
              <th>Price</th>
              <th>Fees / Shipping</th>
              <th>Platform</th>
              <th>Bought</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
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
                <td>{item.created_at}</td>
                <td>{item.price}</td>
                <td>{item.shipping}</td>
                <td>{item.platform}</td>
                <td>{item.soldOrBought}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <LedgerFooter data={data} /> */}
    </div>
  )
}

export default LedgerTable
