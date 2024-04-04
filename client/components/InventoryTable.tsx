import React, { useState } from 'react'
import * as models from '../models/items.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem, patchFormData } from '../apis/fruits'
import moment from 'moment'
import { Form } from 'react-router-dom'
import { Card, Typography } from '@material-tailwind/react'

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
  }

  function addItemsToTable(item: models.item) {
    return (
      <tr
        key={item.id}
        className="group bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item.item}
          <button
            onClick={() => mutateDeleteTransaction.mutate(item.id)}
            className="opacity-0 group-hover:opacity-100 ml-5 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </th>
        <td className="px-3">{moment(item.created_at).format('lll')}</td>
        <td className="px-3">${item.price}</td>
        <td className="px-3">${item.shipping}</td>
        {/* need to make below into fee */}

        <td className="px-3 text-white">${item.price + item.shipping}</td>
        {editItemId === item.id ? (
          <div>
            <form onSubmit={(e) => handleSubmit(e, item.id)}>
              <label htmlFor="potentialValue">
                {' '}
                <input
                  id="potentialValue"
                  name="potentialValue"
                  className="text-black"
                  // onDoubleClick={(e) => handleEditValue(e, item)}
                  defaultValue={item.potentialSalePrice}
                ></input>
              </label>
              <button className="text-white">Submit</button>
            </form>
          </div>
        ) : (
          <td
            className="px-3 text-white"
            key={item.id}
            onDoubleClick={(e) => handleDoubleClick(item.id)}
          >
            ${item.potentialSalePrice}
          </td>
        )}

        <td className="px-3">{item.platform}</td>
      </tr>
    )
  }

  const TABLE_HEAD = [
    'Item',
    'Date Created',
    'Price',
    'Shipping',
    'Price after Fees/Shipping',

    'Value',

    'Platform',
  ]

  function TableWithStripedRows(item) {
    return (
      // <Card className="h-full w-full overflow-scroll">
      //   <table className="w-full min-w-max table-auto text-left">
      //     <thead>
      //       <tr>
      //         {TABLE_HEAD.map((head) => (
      //           <th
      //             key={head}
      //             className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
      //           >
      //             <Typography
      //               variant="small"
      //               color="blue-gray"
      //               className="font-normal leading-none opacity-70"
      //             >
      //               {head}
      //             </Typography>
      //           </th>
      //         ))}
      //       </tr>
      //     </thead>
      <tbody>
        {/* //head// */}

        <tr key={item.item} className="even:bg-blue-gray-50/50">
          <td className="p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {item.item}
            </Typography>
          </td>
          <td className="p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {moment(item.created_at).format('lll')}
            </Typography>
          </td>
          <td className="p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {item.price}
            </Typography>
          </td>
          <td className="p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {item.shipping}
            </Typography>
          </td>
          <td className="p-4">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Edit
            </Typography>
          </td>
        </tr>
      </tbody>
      //   </table>
      // </Card>
    )
  }

  return (
    <div>
      {/* <h1 className="text-white">Inventory</h1>
      <div className="max-h-[calc(85vh-100px)] relative overflow-x-auto shadow-md sm:rounded-lg"> */}

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"> */}
          <thead className="sticky top-0 text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Item
              </th>
              <th className="px-3">Date Created</th>
              <th className="px-3">Price</th>
              <th className="px-3">Shipping</th>
              <th className="px-3">Price after Fees/Shipping</th>
              {/* <div className="has-tooltip"> */}
              <th className="px-3 has-tooltip">
                Value
                <div className="text-white rounded-lg tooltip -mt-8 shadow-lg bg-opacity-50 bg-black p-1">
                  The potential sale price of item
                </div>
              </th>

              {/* </div> */}

              <th className="px-3">Platform</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: models.item) =>
              item.soldOrBought === 'bought'
                ? TableWithStripedRows(item)
                : null,
            )}
          </tbody>
        </table>
      </Card>
    </div>
    // </div>
  )
}
