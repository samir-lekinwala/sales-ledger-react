import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { postFormData } from '../apis/fruits'

function SoldForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const form = new FormData(target)
    const item = form.get('itemsold')?.valueOf() as string
    const price = form.get('howmuch')?.valueOf() as string
    const platform = form.get('fees')?.valueOf() as string
    const shipping = form.get('shipping')?.valueOf() as number
    const soldOrBought = 'sold'
    // const inStock = form.get('inStock')?.valueOf() as number

    const completedBoughtForm = {
      item,
      price,
      soldOrBought,
      shipping,
      platform,
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
      platform: string
      shipping: number
    }) => postFormData(completedBoughtForm),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })

  // function handleButtonClick(e) {
  //   e.preventDefault()
  // }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="text-white" htmlFor="itemsold">
          Item sold
        </label>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          id="itemsold"
          name="itemsold"
          placeholder="What have you sold?"
        ></input>
        <label className="text-white" htmlFor="howmuch">
          For how much?
        </label>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          id="howmuch"
          name="howmuch"
          placeholder="For how much?"
        ></input>
        <label
          htmlFor="fees"
          className="block w-half mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="fees"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose an option</option>
          <option value="trademe">TradeMe</option>
          <option value="facebook">Facebook</option>
          <option value="custom">Custom fee</option>
          <option value="nofee">No fee</option>
        </select>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          id="shipping"
          name="shipping"
          placeholder="Any shipping cost?"
        ></input>
        <button className="group-hover:opacity-100 ml-1 mt-5 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
          Submit
        </button>
      </form>
    </div>
  )
}

export default SoldForm
