import React from 'react'
import CompletedTrades from '../components/CompletedTrades'
import LedgerFooter from '../components/LedgerFooter'
import { useQuery } from '@tanstack/react-query'
import { getAllItems } from '../apis/fruits'

function Completed() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)

  console.log('data', data.body)

  return (
    <div>
      <CompletedTrades data={data.body} />
      <LedgerFooter data={data.body} />
    </div>
  )
}

export default Completed
