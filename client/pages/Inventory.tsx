import React from 'react'
import BuyorSell from '../components/BuyorSell'
import { useQuery } from '@tanstack/react-query'
import { getAllItems } from '../apis/fruits'
import LedgerFooter from '../components/LedgerFooter'
import InventoryTable from '../components/InventoryTable.tsx'

function Inventory() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  return (
    <>
      {/* <BuyorSell /> */}
      <InventoryTable data={data.body} />
      <LedgerFooter data={data.body} />
    </>
  )
}

export default Inventory
