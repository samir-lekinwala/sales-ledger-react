import { useQuery } from '@tanstack/react-query'
import { getAllItems } from '../apis/api.ts'
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
      <InventoryTable page={'inventory'} data={data.body} />
      <LedgerFooter data={data.body} />
    </>
  )
}

export default Inventory
