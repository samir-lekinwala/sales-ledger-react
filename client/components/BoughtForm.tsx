// import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postFormData } from '../apis/fruits'

function BoughtForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const form = new FormData(target)
    const item = form.get('itembought')?.valueOf() as string
    const price = form.get('howmuch')?.valueOf() as string
    const shipping = form.get('shipping')?.valueOf() as number
    const soldOrBought = 'bought'
    // const inStock = form.get('inStock')?.valueOf() as number

    const completedBoughtForm = {
      item,
      price,
      soldOrBought,
      shipping,
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
        <label className="text-white" htmlFor="itembought">
          Item bought
        </label>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          id="itembought"
          name="itembought"
          placeholder="What have you bought?"
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
        <label className="text-white" htmlFor="shipping">
          Any shipping cost?
        </label>
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

export default BoughtForm
