import React from 'react'
import * as models from '../models/items'

interface Props {
  data: models.item[]
}

function LedgerTable(props: Props) {
  const { data } = props
  console.log(data)

  return (
    <div>
      <h1>The Ledger</h1>
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.item}
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
    </div>
  )
}

export default LedgerTable
