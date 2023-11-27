// import React from 'react'

import { postFormData } from '../apis/fruits'

function BoughtForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.currentTarget
    const form = new FormData(target)
    const itemBought = form.get('itembought')?.valueOf() as string
    const howMuch = form.get('howmuch')?.valueOf() as string
    const shipping = form.get('shipping')?.valueOf() as number
    // const inStock = form.get('inStock')?.valueOf() as number

    const completedBoughtForm = {
      itemBought,
      howMuch,
      shipping,
    }
    console.log(completedBoughtForm)
    await postFormData(completedBoughtForm)
  }
  function handleButtonClick(e) {
    e.preventDefault()
    console.log('hbdsahjd')
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="itembought">Item bought</label>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          id="itembought"
          name="itembought"
          placeholder="What have you bought?"
        ></input>
        <label htmlFor="howmuch">For how much?</label>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          id="howmuch"
          name="howmuch"
          placeholder="For how much?"
        ></input>
        <label htmlFor="shipping">Any shipping cost?</label>
        <input
          className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          id="shipping"
          name="shipping"
          placeholder="Any shipping cost?"
        ></input>
        <button onClick={(e) => handleButtonClick(e)}>Submit</button>
      </form>
    </div>
  )
}

export default BoughtForm
