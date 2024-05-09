import { Input } from '@material-tailwind/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { getItem, postFormData } from '../apis/fruits'
import { itemSoldOrBought, notify } from '../functions/functions'
import { ModuleNamespace } from 'vite/types/hot.js'
import { item } from '../models/items'
import BuyorSell from './BuyorSell'
import BoughtForm from './BoughtForm'

function EditForm() {
  const { id } = useParams()
  const [data, setData] = useState<item>('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result = await getItem(Number(id))
      setData(result.body[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  console.log('switched', data)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const target = event.currentTarget
    const form = new FormData(target)
    const item = form.get('itembought')?.valueOf() as string
    const price = form.get('howmuch')?.valueOf() as string
    const shipping = form.get('shipping')?.valueOf() as number
    const potentialSalePrice = form.get('potential-value')?.valueOf() as number
    const soldOrBought = 'bought'
    notify('success', `${item} has been successfully edited`)
    // const inStock = form.get('inStock')?.valueOf() as number

    const completedBoughtForm = {
      item,
      price,
      soldOrBought,
      shipping,
      potentialSalePrice,
    }
    // await postFormData(completedBoughtForm)
    mutateAddBoughtTransaction.mutate(completedBoughtForm)
    target.reset()
  }
  const queryClient = useQueryClient()
  const mutateAddBoughtTransaction = useMutation({
    mutationFn: (completedBoughtForm: {
      item: string
      price: string
      soldOrBought: string
      shipping: number
      potentialSalePrice: number
    }) => postFormData(completedBoughtForm),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })

  return (
    <div>
      {data.soldOrBought == 'bought' ? <BoughtForm data={data} /> : <p>sold</p>}
    </div>
  )
}

export default EditForm
