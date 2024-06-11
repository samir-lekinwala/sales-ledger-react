import React from 'react'
import * as models from '../models/items'
import { arrayOfCompletedTrades } from '../functions/functions'

interface props {
  data: models.item[]
}

function CompletedTrades(props: props) {
  const data = arrayOfCompletedTrades(props.data)

  return (
    <div>
      <ul>
        {data.map((x) => (
          <li key={x.id}>{x.item}</li>
        ))}
      </ul>
    </div>
  )
}

export default CompletedTrades
