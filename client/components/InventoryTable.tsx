import React, { useEffect, useState } from 'react'
import * as models from '../models/items.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem, patchFormData } from '../apis/api.ts'
import moment from 'moment'
import { useOutsideClick } from '../hooks/useOutsideClick.ts'
import InventoryMenu from './InventoryMenu.tsx'
import {
  addNetPriceToData,
  calculateFeesTotal,
} from '../functions/functions.tsx'

interface Props {
  data: models.item[]
  page: string
}

export default function InventoryTable(props: Props) {
  const { data, page } = props

  const [itemOptions, setItemOptions] = useState<number | null>()
  const [optionsVisible, setOptionsVisible] = useState<boolean | null>()
  const [editItemId, setEditItemId] = useState<number | null>(null)
  const [rowHighlighted, setRowHighlighted] = useState<[]>([])
  // const [rawData, setRawData] = useState()
  const [storedData, setStoredData] = useState(boughtItemsFilter())
  const [sortedOrder, setSortedOrder] = useState(false)
  const [tableHeaders, setTableHeaders] = useState(tableHeadersBasedOnPage())
  const [boughtIdArray, setBoughtIdArray] = useState(getBoughtIdArray())

  function getBoughtIdArray() {
    const result = []
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].bought_Id) {
        result.push(props.data[i].bought_Id)
      }
    }
    return result
  }

  function boughtIdMatchesItemId(id) {
    const boughtIdSet = new Set(boughtIdArray)
    // console.log(boughtIdSet.has(id), id)
    return boughtIdSet.has(id)
  }

  useEffect(() => {
    // const filtered = boughtItemsFilter()
    setStoredData(boughtItemsFilter())
    getBoughtIdArray()
    // console.log('boughtidarray', boughtIdArray)

    // addNetPriceToData()
  }, [props.data])

  function boughtItemsFilter() {
    if (page == 'inventory') {
      const filterResult = props.data
        // .reverse()
        .filter((x) => x.inventory == true)

      const result = addNetPriceToData(filterResult)
      return result
    } else {
      return addNetPriceToData(props.data)
    }
  }

  function tableHeadersBasedOnPage() {
    if (page == 'inventory') {
      // console.log('props inventory page')
      return [
        'Item',
        'Date',
        'Price',
        'Shipping',
        'Net price',
        // 'Price after Fees/Shipping',
        'Value',
        // 'Platform',
      ]
    } else if (page == 'ledger') {
      // console.log('props ledger page')
      return [
        'Item',
        'Date',
        'Price',
        'Shipping',
        'Fee',
        'Net price',
        'Value',
        'Platform',
        'Sold / Bought',
      ]
    } else if (page == 'completed') {
      // console.log('props completed page')
      return ['Item', 'Date sold', 'Bought Price', 'Sold Price', 'Profit']
    }
  }

  // const rawData = props.data

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    itemId: number,
  ) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const potentialValue = formData.get('potentialValue')?.valueOf() as number
    const submitForm = { id: itemId, potentialSalePrice: potentialValue }
    mutateEditTransaction.mutate(submitForm)
  }

  const queryClient = useQueryClient()

  const mutateEditTransaction = useMutation({
    mutationFn: (submitForm: { id: number; potentialSalePrice: number }) =>
      patchFormData(submitForm),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
      setStoredData(boughtItemsFilter())
      setEditItemId(null)
    },
  })

  //  const mutateDeleteTransaction = useMutation({
  //     mutationFn: (id: number) => deleteItem(id),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['items'])
  //     },
  //   })

  function handleDoubleClick(id: number) {
    setEditItemId(id)
  }

  function handleItemOptions(itemId: number) {
    if (itemId == itemOptions) {
      setItemOptions(null)
      setOptionsVisible(false)
    } else setItemOptions(itemId)
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

    // console.log('rowhighlighted', rowHighlighted)
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
    // ['Platform', 'platform'],
  ])

  function sortData(column) {
    setSortedOrder(!sortedOrder)
    const type = headerMap.get(column)
    let newData
    if (type !== 'created_at' && sortedOrder) {
      newData = storedData.sort((a, b) => a[type] - b[type])
      setStoredData(newData)
    } else if (!sortedOrder) {
      newData = storedData.sort((a, b) => b[type] - a[type])
      setStoredData(newData)
    }
    if (type == 'created_at' && !sortedOrder) {
      newData = storedData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      )
      setStoredData(newData)
    } else if (type == 'created_at' && sortedOrder) {
      newData = storedData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      )
      setStoredData(newData)
    }
    if (type == 'item' && !sortedOrder) {
      newData = storedData.sort((a, b) => a[type].localeCompare(b[type]))
      setStoredData(newData)
    } else if (type == 'item' && sortedOrder) {
      newData = storedData.sort((a, b) => b[type].localeCompare(a[type]))
      setStoredData(newData)
    }
  }

  function addItemsToTable(item: models.item) {
    const singleFee = calculateFeesTotal(item).toFixed(2)

    const fee = (item.price - calculateFeesTotal(item) - item.shipping).toFixed(
      2,
    )
    if (!item.boughtItem) {
      item.boughtItem = { netprice: 0 }
    }
    // console.log('fee', singleFee, fee)
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
          id={`row-${item.id}`}
          scope="row"
          className={
            boughtIdMatchesItemId(item.id) == true || item.bought_Id
              ? 'font-medium underline decoration-[#76ABAE] text-left relative left-2'
              : 'font-medium text-[#EEEEEE] text-left relative left-2'
          }
          onClick={() => handleItemOptions(item.id)}
        >
          <InventoryMenu item={item} selectedArray={rowHighlighted} />
        </th>
        <td className="px-3">{moment(item.created_at).format('lll')}</td>

        {/* For completed page */}
        {page === 'completed' ? (
          // bought price
          <>
            <td className="px-1">${item.boughtItem?.netprice.toFixed(2)}</td>

            <td className="px-1">${singleFee}</td>
            <td className="px-1">
              ${(singleFee - item.boughtItem?.netprice).toFixed(2)}
            </td>
          </>
        ) : (
          <>
            {' '}
            <td className="px-1">${item.price}</td>
            <td className="px-3">${item.shipping}</td>
            {/* need to make below into fee */}
            {/* net price */}
            {
              page == 'ledger' && item.soldOrBought === 'sold' ? (
                <td className=" text-white">
                  $
                  {
                    fee
                    // item.price - item.shipping - fee
                  }
                </td>
              ) : page == 'ledger' && item.soldOrBought === 'bought' ? (
                <td>$0</td>
              ) : null
              // <td>$0</td>
            }
            <td className="px-3 font-bold">
              $
              {page == 'ledger' && item.soldOrBought == 'sold'
                ? Number(item.netprice) - fee
                : item.netprice}
            </td>
            {/* )} */}
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
            ) : item.soldOrBought == 'bought' ? (
              <td
                key={item.id}
                onDoubleClick={() => handleDoubleClick(item.id)}
              >
                ${item.potentialSalePrice}
              </td>
            ) : (
              <td></td>
            )}
            {page == 'ledger' ? (
              <td className="px-3">{item.platform}</td>
            ) : null}
            {props.page == 'ledger' ? (
              item.soldOrBought === 'bought' ? (
                <td className="px-3 text-white">Bought</td>
              ) : (
                <td className="px-3 text-rose-600">Sold</td>
              )
            ) : null}
          </>
        )}
      </tr>
    )
  }

  // max-h-[calc(90vh-93px)]
  // bg-[#76ABAE]

  return (
    <>
      <div className="max-h-[calc(100vh-150px)] overflow-x-auto shadow-md rounded-lg">
        <div className="bg-[#eee] fixed h-8 w-full rounded-lg flex justify-center font-poppins border-t-4 border-[#76ABAE]">
          {props.page.toUpperCase()}
        </div>
        <div className=" w-full flex justify-center bg-[#eee]">
          {props.page.toUpperCase()}
        </div>
        <table className="w-full table-auto text-left ">
          <thead className="z-20 sticky top-0 text-xs uppercase bg-[#EEEEEE] text-[#222831]">
            <tr className="h-2.5">
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className={`px-1`}
                  onClick={() => sortData(header)}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {storedData.map((item: models.item) => addItemsToTable(item))}
          </tbody>
        </table>
      </div>
    </>
  )
}
