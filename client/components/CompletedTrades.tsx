import { useState } from 'react'
import * as models from '../models/items'
import {
  addNetPriceToData,
  arrayOfCompletedTrades,
  combineData,
} from '../functions/functions'
import InventoryTable from './InventoryTable'

interface props {
  data: models.item[]
}

function CompletedTrades(props: props) {
  const data = arrayOfCompletedTrades(props.data)
  const [combinedData] = useState(combineData(addNetPriceToData(data)))

  console.log('testing state', combinedData)

  return (
    <div>
      <InventoryTable data={combinedData} page={'completed'} />
    </div>
  )
}

export default CompletedTrades
