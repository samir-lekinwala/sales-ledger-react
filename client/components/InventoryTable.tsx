import React, { useState } from 'react'
import * as models from '../models/items.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem, patchFormData } from '../apis/fruits'
import moment from 'moment'
import { Link } from 'react-router-dom'

interface Props {
  data: models.item[]
}

export default function InventoryTable(props: Props) {
  const [editItemId, setEditItemId] = useState<number | null>(null)

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    itemId: number,
  ) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const potentialValue = formData.get('potentialValue')?.valueOf() as number
    console.log(potentialValue)

    const submitForm = { id: itemId, potentialSalePrice: potentialValue }
    console.log(submitForm)
    mutateEditTransaction.mutate(submitForm)
  }

  const queryClient = useQueryClient()

  const mutateEditTransaction = useMutation({
    mutationFn: (submitForm: { id: number; potentialSalePrice: number }) =>
      patchFormData(submitForm),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
      setEditItemId(null)
    },
  })

  const { data } = props

  const mutateDeleteTransaction = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })

  function handleDoubleClick(id: number) {
    setEditItemId(id)
    console.log('item id set')
  }

  function addItemsToTable(item: models.item) {
    return (
      <tr
        key={item.id}
        className="text-xs group text-white border-b bg-[#31363F] dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="font-medium text-[#EEEEEE] text-left relative left-2"
        >
          <Link className="hover:font-bold" to={`/edit/${item.id}`}>
            {item.item}
          </Link>
          <button
            onClick={() => mutateDeleteTransaction.mutate(item.id)}
            className="opacity-0 group-hover:opacity-100 mt-2 ml-3 inline-block text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            X
          </button>
        </th>
        <td className="px-3">{moment(item.created_at).format('lll')}</td>
        <td className="px-3">${item.price}</td>
        <td className="px-3">${item.shipping}</td>
        {/* need to make below into fee */}

        <td className="px-3 font-bold">${item.price + item.shipping}</td>
        {editItemId === item.id ? (
          <div className="py-5 relative">
            <form onSubmit={(e) => handleSubmit(e, item.id)}>
              <label htmlFor="potentialValue">
                {' '}
                <input
                  id="potentialValue"
                  name="potentialValue"
                  className="text-black w-20"
                  defaultValue={item.potentialSalePrice}
                ></input>
              </label>
              <button className="px-3">
                <span>&#10003;</span>
              </button>
            </form>
          </div>
        ) : (
          <td key={item.id} onDoubleClick={(e) => handleDoubleClick(item.id)}>
            ${item.potentialSalePrice}
          </td>
        )}

        <td className="px-3">{item.platform}</td>
      </tr>
    )
  }

  const tableHeaders = [
    'Item',
    'Date Created',
    'Price',
    'Shipping',
    'Price after Fees/Shipping',
    'Value',
    'Platform',
  ]

  return (
    <div className="max-h-[calc(85vh-100px)] relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-auto text-left">
        <thead className="sticky top-0 text-xs uppercase bg-[#EEEEEE] text-[#222831]">
          <tr className="h-2.5">
            {tableHeaders.map((header) => (
              <th key={header} className="px-1">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: models.item) =>
            item.soldOrBought === 'bought' ? addItemsToTable(item) : null,
          )}
        </tbody>
      </table>
    </div>
  )
}
