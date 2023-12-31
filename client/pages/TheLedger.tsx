import React from 'react'
import { getAllItems } from '../apis/fruits'
import { useQuery } from '@tanstack/react-query'
import LedgerTable from '../components/LedgerTable'
import Footer from '../components/LedgerFooter'
import LedgerFooter from '../components/LedgerFooter'

function TheLedger() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  return (
    <div>
      <LedgerTable data={data.body} />
      <LedgerFooter data={data.body} />
    </div>
  )
}

export default TheLedger
