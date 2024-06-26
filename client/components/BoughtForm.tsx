// import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchFormData, postFormData } from '../apis/api'
import { Link } from 'react-router-dom'
import { notify } from '../functions/functions'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Card,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from '@material-tailwind/react'
import { editedItem, item } from '../models/items'
import LedgerFooter from './LedgerFooter'
import { useState } from 'react'

interface props {
  data?: item
  children: React.ReactNode
}

function BoughtForm({ children, data }: props) {
  const [addToInventory, setAddToInventory] = useState(true)

  function inventoryHandler(boolean: boolean) {
    setAddToInventory(boolean)
  }

  const id = data?.id

  console.log('data for boughtform', data)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const target = event.currentTarget
    const form = new FormData(target)
    const item = form.get('itembought')?.valueOf() as string
    const inventory = form.get('inventoryOption')?.valueOf() as string
    const price = form.get('howmuch')?.valueOf() as number
    const shipping = form.get('shipping')?.valueOf() as number
    const potentialSalePrice = form.get('potential-value')?.valueOf() as number
    const soldOrBought = 'bought'
    // const inStock = form.get('inStock')?.valueOf() as number
    console.log('inventory form', inventory)
    const completedBoughtForm = {
      item,
      price,
      soldOrBought,
      shipping,
      potentialSalePrice,
      inventory,
    }

    const editedForm = {
      id,
      item,
      price,
      soldOrBought,
      shipping,
      potentialSalePrice,
      inventory,
    }

    // await postFormData(completedBoughtForm)
    if (data) {
      setTimeout(() => {
        console.log('item from the timeout', item)
        notify({
          type: 'success',
          text: `${item} has been successfully been edited`,
        })
      }, 500)

      // target.reset()
      mutateEditBoughtTransaction.mutate(editedForm)
    } else {
      setTimeout(() => {
        console.log('item from the timeout', item)
        notify({ type: 'success', text: `${item} has been successfully added` })
      }, 500)

      mutateAddBoughtTransaction.mutate(completedBoughtForm)
      target.reset()
    }
  }
  const queryClient = useQueryClient()
  const mutateAddBoughtTransaction = useMutation({
    mutationFn: (
      completedBoughtForm: editedItem,
      //   {
      //   item: string
      //   price: string
      //   soldOrBought: string
      //   shipping: number
      //   potentialSalePrice: number
      // }
    ) => postFormData(completedBoughtForm),
    // .then((test) =>
    // console.log('testtttt', test),
    // )
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })
  const mutateEditBoughtTransaction = useMutation({
    mutationFn: (
      editedForm: editedItem,
      // {
      // id: number
      // item: string
      // price: string
      // soldOrBought: string
      // shipping: number
      // potentialSalePrice: number
      // }
    ) => patchFormData(editedForm),
    onSuccess: () => {
      queryClient.invalidateQueries(['item'])
    },
  })

  return (
    <div>
      {data != null ? (
        <div className="flex flex-col gap-20 justify-center items-center mt-16">
          {/* <ToastContainer position="top-center" /> */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#31363F] text-white shadow-gray-900/60 shadow-lg sm:w-full sm:p-8 p-4 pb-10">
              <p className="text-center mb-5 text-4xl font-jersey-25 uppercase">
                Edit
              </p>
              {children}
              <div className="sm:w-96 flex flex-col gap-5 items-center">
                <Input
                  className="focus:ring-0"
                  label="Item bought"
                  color="white"
                  type="text"
                  id="itembought"
                  name="itembought"
                  defaultValue={data.item}
                  placeholder="What have you bought?"
                  required
                  crossOrigin={undefined}
                ></Input>
                <Input
                  color="white"
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="howmuch"
                  name="howmuch"
                  placeholder="For how much?"
                  label="Price"
                  defaultValue={data.price}
                  crossOrigin={undefined}
                  required
                ></Input>
                <Input
                  color="white"
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="potential-value"
                  name="potential-value"
                  placeholder="Add potential value"
                  label="Add potential value"
                  required
                  defaultValue={data.potentialSalePrice}
                  crossOrigin={undefined}
                ></Input>
                <Input
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="shipping"
                  name="shipping"
                  step={0.01}
                  defaultValue={data.shipping}
                  color="white"
                  placeholder="Any shipping cost?"
                  label="Any shipping cost?"
                  crossOrigin={undefined}
                ></Input>
              </div>
              <div className="mt-4  flex flex-col  justify-centerw-full">
                <p className="text-white mb-4">Add to inventory?</p>
                <Card className="w-full max-w-[24rem] bg-transparent shadow-lg">
                  <List className="flex-row">
                    <ListItem className="p-0">
                      <label
                        htmlFor="yesInventory"
                        className={
                          addToInventory
                            ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                            : 'flex w-full cursor-pointer items-center px-3 py-2'
                        }
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            // onChange={handleShippingChange}
                            defaultChecked={addToInventory}
                            onChange={() => inventoryHandler(true)}
                            value={1}
                            name="inventoryOption"
                            id="yesInventory"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: 'p-0 bg-transparent',
                            }}
                            crossOrigin={undefined}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium text-white w-full text-center"
                        >
                          Yes
                        </Typography>
                      </label>
                    </ListItem>
                    <ListItem className="p-0">
                      <label
                        htmlFor="noInventory"
                        className={
                          !addToInventory
                            ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                            : 'flex w-full cursor-pointer items-center px-3 py-2'
                        }
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            onChange={() => inventoryHandler(false)}
                            defaultChecked={!addToInventory}
                            value={0}
                            name="inventoryOption"
                            id="noInventory"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: 'p-0',
                            }}
                            crossOrigin={undefined}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium text-white w-full text-center"
                        >
                          No
                        </Typography>
                      </label>
                    </ListItem>
                  </List>
                </Card>
              </div>
              <div className="flex flex-row justify-between">
                <button className="relative group-hover:opacity-100 ml-1 mt-5 text-[#eee] hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Submit
                </button>
                <span className="relative group-hover:opacity-100 ml-1 mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                  <Link to={`/theledger`}>View Ledger</Link>
                </span>
                <span className="relative group-hover:opacity-100 ml-1 mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                  <Link to={`/inventory`}>Inventory</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-20 justify-center items-center mt-16">
          {/* <ToastContainer position="top-center" /> */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#31363F] text-white shadow-gray-900/60 shadow-lg max-w-[340px] sm:max-w-full sm:w-full sm:p-8 p-8 pb-10">
              <p className="text-center mb-5 text-4xl font-jersey-25 uppercase">
                Bought
              </p>
              {children}
              <div className="sm:w-96 flex flex-col gap-5 items-center">
                <Input
                  className="focus:ring-0"
                  label="Item bought"
                  color="white"
                  type="text"
                  id="itembought"
                  name="itembought"
                  placeholder="What have you bought?"
                  required
                  crossOrigin={undefined}
                ></Input>
                <Input
                  color="white"
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="howmuch"
                  name="howmuch"
                  placeholder="For how much?"
                  label="Price"
                  required
                  crossOrigin={undefined}
                ></Input>
                <Input
                  color="white"
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="potential-value"
                  name="potential-value"
                  placeholder="Add potential value"
                  label="Add potential value"
                  required
                  crossOrigin={undefined}
                ></Input>
                <Input
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="shipping"
                  name="shipping"
                  step={0.01}
                  defaultValue={0}
                  color="white"
                  placeholder="Any shipping cost?"
                  label="Any shipping cost?"
                  crossOrigin={undefined}
                ></Input>
              </div>
              {/* radio button test */}
              <div className="mt-4  flex flex-col  justify-centerw-full">
                <p className="text-white mb-4">Add to inventory?</p>
                <Card className="w-full max-w-[24rem] bg-transparent shadow-lg">
                  <List className="flex-row">
                    <ListItem className="p-0">
                      <label
                        htmlFor="yesInventory"
                        className={
                          addToInventory
                            ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                            : 'flex w-full cursor-pointer items-center px-3 py-2'
                        }
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            // onChange={handleShippingChange}
                            defaultChecked={addToInventory}
                            onChange={() => inventoryHandler(true)}
                            value={1}
                            name="inventoryOption"
                            id="yesInventory"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: 'p-0 bg-transparent',
                            }}
                            crossOrigin={undefined}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium text-white w-full text-center"
                        >
                          Yes
                        </Typography>
                      </label>
                    </ListItem>
                    <ListItem className="p-0">
                      <label
                        htmlFor="noInventory"
                        className={
                          !addToInventory
                            ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                            : 'flex w-full cursor-pointer items-center px-3 py-2'
                        }
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            onChange={() => inventoryHandler(false)}
                            defaultChecked={!addToInventory}
                            value={0}
                            name="inventoryOption"
                            id="noInventory"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: 'p-0',
                            }}
                            crossOrigin={undefined}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium text-white w-full text-center"
                        >
                          No
                        </Typography>
                      </label>
                    </ListItem>
                  </List>
                </Card>
              </div>
              {/* radio button test */}
              <div className="flex flex-row gap-2 justify-between">
                <button className="relative group-hover:opacity-100 ml-1 mt-5 text-[#eee] hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Submit
                </button>
                <span className="relative group-hover:opacity-100 ml-1 mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                  <Link to={`/theledger`}>View Ledger</Link>
                </span>
                <span className="relative group-hover:opacity-100 ml-1 mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                  <Link to={`/inventory`}>View Inventory</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default BoughtForm
