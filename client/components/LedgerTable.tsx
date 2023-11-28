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
      <table>
        <thead>
          <tr>
            <th>Date Created</th>
            <th>Item</th>
            <th>Price</th>
            <th>Fees / Shipping</th>
            <th>Platform</th>
            <th>Bought</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.created_at}</td>
              <td>{item.item}</td>
              <td>{item.price}</td>
              <td>{item.shipping}</td>
              <td>{item.platform}</td>
              <td>{item.soldOrBought}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LedgerTable
