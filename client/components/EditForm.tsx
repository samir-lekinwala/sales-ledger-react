import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getItem } from '../apis/fruits'

import { item } from '../models/items'
import BuyorSell from './BuyorSell'
import BoughtForm from './BoughtForm'
import SoldForm from './SoldForm'

function EditForm() {
  const { id, boughtOrSold } = useParams()
  const [data, setData] = useState<item>('')

  console.log('mutaste data', data)

  useEffect(() => {
    // fetchData()
    // mutateAddBoughtTransaction.mutate()
    useParams
  }, [])

  Example()
  function Example() {
    const { error, isLoading } = useQuery({
      queryKey: ['item'],
      queryFn: () =>
        getItem(Number(id)).then((res) => {
          setData(res.body[0])
          return res
        }),
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error
  }

  // async function fetchData() {
  //   try {
  //     const result = await getItem(Number(id))
  //     setData(result.body[0])
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }
  // console.log('switched', data)

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   const target = event.currentTarget
  //   const form = new FormData(target)
  //   const item = form.get('itembought')?.valueOf() as string
  //   const price = form.get('howmuch')?.valueOf() as string
  //   const shipping = form.get('shipping')?.valueOf() as number
  //   const potentialSalePrice = form.get('potential-value')?.valueOf() as number
  //   const soldOrBought = 'bought'
  //   notify('success', `${item} has been successfully edited`)
  //   // const inStock = form.get('inStock')?.valueOf() as number

  //   const completedBoughtForm = {
  //     item,
  //     price,
  //     soldOrBought,
  //     shipping,
  //     potentialSalePrice,
  //   }
  //   // await postFormData(completedBoughtForm)
  //   mutateAddBoughtTransaction.mutate(completedBoughtForm)
  //   target.reset()
  // }
  // const queryClient = useQueryClient()
  // const mutateAddBoughtTransaction = useMutation({
  //   mutationFn: () => fetchData(),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['item'])
  //   },
  // })
  // const mutateAddBoughtTransaction = useMutation({
  //   mutationFn: (completedBoughtForm: {
  //     item: string
  //     price: string
  //     soldOrBought: string
  //     shipping: number
  //     potentialSalePrice: number
  //   }) => postFormData(completedBoughtForm),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['items'])
  //   },
  // })

  return (
    <div>
      {data && boughtOrSold == 'bought' ? (
        <>
          <BoughtForm data={data}>
            <BuyorSell data={data} boughtOrSold={boughtOrSold} id={id} />
          </BoughtForm>
        </>
      ) : (
        <SoldForm data={data} shipping={data.shipping}>
          <BuyorSell data={data} boughtOrSold={boughtOrSold} id={id} />
        </SoldForm>
      )}
    </div>
  )
}

export default EditForm
