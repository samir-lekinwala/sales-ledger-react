import React, { useEffect, useState } from 'react'
import * as models from '../models/items.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem, patchFormData } from '../apis/fruits'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, List, ListItem } from '@material-tailwind/react'
import { useOutsideClick } from '../hooks/useOutsideClick.ts'
import InventoryMenu from './InventoryMenu.tsx'

interface Props {
  data: models.item[]
}

export default function InventoryTable(props: Props) {
  const [itemOptions, setItemOptions] = useState<number | null>()
  const [optionsVisible, setOptionsVisible] = useState<boolean | null>()
  const [editItemId, setEditItemId] = useState<number | null>(null)
  const [rowHighlighted, setRowHighlighted] = useState<[]>([])
  const [storedData, setStoredData] = useState(props.data)
  const [sortedOrder, setSortedOrder] = useState(false)

  console.log('stored data', storedData)
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

  function handleItemOptions(itemId: number) {
    if (itemId == itemOptions) {
      setItemOptions(null)
      setOptionsVisible(false)
    } else setItemOptions(itemId)
    console.log('tested', itemId)
    setOptionsVisible(true)
  }

  const ref = useOutsideClick(() => {
    setOptionsVisible(false)
  })

  function rowOnClick(itemId) {
    const tempArray = [...rowHighlighted]

    if (tempArray.includes(itemId)) {
      tempArray.splice(tempArray.indexOf(itemId), 1)
      setRowHighlighted((rowHighlighted) => [...tempArray])
    } else setRowHighlighted((rowHighlighted) => [...rowHighlighted, itemId])
  }

  function idIncludedInSelected(element) {
    return rowHighlighted.includes(element)
  }

  const headerMap = new Map([
    ['Item', 'item'],
    ['Date', 'created_at'],
    ['Price', 'price'],
    ['Shipping', 'shipping'],
    ['Net price', 'netprice'],
    ['Value', 'potentialSalePrice'],
    ['Platform', 'platform'],
  ])

  function sortData(column) {
    setSortedOrder(!sortedOrder)
    const type = headerMap.get(column)
    console.log(type)
    // console.log('column', column.toLowerCase())
    let newData
    if (type !== 'created_at' && sortedOrder) {
      newData = storedData.sort((a, b) => a[type] - b[type])
      setStoredData(newData)
      console.log('test3', storedData)
    } else if (!sortedOrder) {
      newData = storedData.sort((a, b) => b[type] - a[type])
      setStoredData(newData)
      console.log('test4', storedData)
    }
    if (type == 'created_at') {
      newData = storedData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      )
      setStoredData(newData)
      console.log('test2', storedData)
    }
    console.log('sorted data test', storedData)
  }

  useEffect(() => {
    addNetPriceToData()
  }, [])

  function addNetPriceToData() {
    const newData = []
    for (let i = 0; i < storedData.length; i++) {
      newData.push({
        ...storedData[i],
        netprice: storedData[i].shipping + storedData[i].price,
      })
    }
    setStoredData(newData)
  }

  function addItemsToTable(item: models.item) {
    return (
      <tr
        key={item.id}
        className={`${
          idIncludedInSelected(item.id)
            ? 'bg-[#76ABAE] group/item font-inter text-xs group text-white border-b bg-[#31363F] dark:bg-gray-800 dark:border-gray-700'
            : 'hover:bg-[#76ABAE] even:bg-[#222831] group/item font-inter text-xs group text-white border-b bg-[#31363F] dark:bg-gray-800 dark:border-gray-700'
        }`}
        id="table-row-inventory"
        onClick={() => rowOnClick(item.id)}
      >
        <th
          scope="row"
          className="font-medium text-[#EEEEEE] text-left relative left-2"
          onClick={() => handleItemOptions(item.id)}
        >
          <div>{item.item}</div>

          {/* <Link className="" to={`/edit/${item.soldOrBought}/${item.id}`}>
            {item.item}
          </Link> */}

          {/* <div className="w-fit opacity-0 group-hover/item:opacity-100 hover flex flex-col gap-4"> */}
          {item.id == itemOptions && optionsVisible ? (
            // <InventoryMenu />
            <Card id="rowCard" ref={ref} className="w-20 absolute z-20">
              <List>
                <ListItem
                  className="w-16"
                  // size=""
                  // className="text-blue-700"
                  // className="mt-2 ml-3 inline-block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  <Link to={`/edit/${item.soldOrBought}/${item.id}`}>Edit</Link>

                  {/* Edit */}
                </ListItem>
                <ListItem
                  className="w-16 text-blue-700 hover:text-white hover:bg-blue-700"
                  // size=""
                  // className="text-blue-700"
                  // className="mt-2 ml-3 inline-block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  <Link to={`/edit/sold/${item.id}`}>Sold</Link>

                  {/* Edit */}
                </ListItem>
                <ListItem
                  className="w-16 flex justify-center text-[#ff2525] hover:text-[#fff] hover:bg-[#ff0000]"
                  onClick={() => mutateDeleteTransaction.mutate(item.id)}
                  // className="text-red-700 my-2"
                  // className="mt-2 ml-3 inline-block text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Delete
                </ListItem>
              </List>
            </Card>
          ) : null}
          {/* </div> */}
        </th>
        <td className="px-3">{moment(item.created_at).format('lll')}</td>
        <td className="px-3">${item.price}</td>
        <td className="px-3">${item.shipping}</td>
        {/* need to make below into fee */}
        {/* net price */}
        <td className="px-3 font-bold">${item.netPrice}</td>
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
          <td key={item.id} onDoubleClick={() => handleDoubleClick(item.id)}>
            ${item.potentialSalePrice}
          </td>
        )}

        <td className="px-3">{item.platform}</td>
      </tr>
    )
  }

  const tableHeaders = [
    'Item',
    'Date',
    'Price',
    'Shipping',
    'Net price',
    // 'Price after Fees/Shipping',
    'Value',
    'Platform',
  ]
  // max-h-[calc(90vh-93px)]

  return (
    <div className="max-h-[calc(100vh-150px)] overflow-x-auto shadow-md rounded-lg">
      <table className="w-full table-auto text-left">
        <thead className="z-20 sticky top-0 text-xs uppercase bg-[#EEEEEE] text-[#222831]">
          <tr className="h-2.5">
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="px-1"
                onClick={() => sortData(header)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {storedData.map((item: models.item) =>
            item.soldOrBought === 'bought' ? addItemsToTable(item) : null,
          )}
        </tbody>
      </table>
    </div>
  )
}
