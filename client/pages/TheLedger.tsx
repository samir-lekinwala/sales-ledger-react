import React from 'react'
import { getAllItems } from '../apis/api'
import { useQuery } from '@tanstack/react-query'
import LedgerTable from '../components/LedgerTable'
import Footer from '../components/LedgerFooter'
import LedgerFooter from '../components/LedgerFooter'
import BuyorSell from '../components/BuyorSell'
import InventoryTable from '../components/InventoryTable'

function TheLedger() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  return (
    <div>
      {/* <BuyorSell /> */}
      <InventoryTable data={data.body} page={'ledger'} />
      {/* <LedgerTable data={data.body} /> */}
      <LedgerFooter data={data.body} />
    </div>
  )
}

export default TheLedger
