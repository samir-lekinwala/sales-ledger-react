import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { postFormData } from '../apis/fruits'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { notify } from '../functions/functions'
import { Input, Option, Select } from '@material-tailwind/react'

import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react'

interface CompletedSoldForm {
  item: string
  price: number
  soldOrBought: string
  shipping: number
  platform: string
  feeDollar: number
  feePercent: number
}

function SoldForm() {
  const trademeFee = 0.079 //7.9%

  const [value, setValue] = React.useState('nofee')
  const [selectedOption, setSelectedOption] = useState('nofee')
  const [selectedShipping, setSelectedShipping] = useState('')
  const [additionalInputVisible, setAdditionalInputVisible] = useState(false)
  const [shippingInputVisible, setShippingInputVisible] = useState(false)

  function handleOptionChange(e) {
    const selectedValue = e
    console.log('handleopotion', e)
    setSelectedOption(selectedValue)
    setValue(selectedValue)
    // console.log(selectedOption)

    // You can customize this condition based on the option that should trigger showing additional fields
    if (
      selectedValue.includes('custom')
      // selectedValue === 'trademe-custom' || selectedValue === 'custom'
    ) {
      setAdditionalInputVisible(true)
    } else {
      setAdditionalInputVisible(false)
    }
  }

  // const handleShippingChange = e => {
  //   setSelectedShipping(e.target.value)
  // }

  const handleShippingChange = (e) => {
    console.log('hit?')
    const selectedValue = e.target.value
    setSelectedShipping(selectedValue)
    // console.log(selectedOption)

    // You can customize this condition based on the option that should trigger showing additional fields
    if (
      selectedValue === 'yes'
      // selectedValue === 'trademe-custom' || selectedValue === 'custom'
    ) {
      console.log('testtt')
      setShippingInputVisible(true)
    } else {
      setShippingInputVisible(false)
    }
  }

  function percentOrDollar(string) {
    if (string.includes('dollar')) return 'dollar'
    else return 'percent'
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log(event)
    event.preventDefault()

    const target = event.currentTarget
    const form = new FormData(target)
    console.log(form)
    const item = form.get('itemsold')?.valueOf() as string
    const price = Number(form.get('howmuch')?.valueOf() as string)
    // const platform = form.get('platform')?.valueOf() as string
    const platform = selectedOption
    const shipping = form.get('shipping')?.valueOf() as number
    const fees = form.get('custom-fee')?.valueOf() as number
    const soldOrBought = 'sold'
    const fee = feeCalculation(platform, Number(price)) as number
    console.log('platform', platform, 'shipping', shipping)
    // notify('success', `${item} successfully added to your ledger`)
    // const inStock = form.get('inStock')?.valueOf() as number

    //need to take what the custom fee percentages are or dollars are from input and have a function
    //that returns a soldForm based on that output which matches the database naming and structure
    //input comes in as custom-fee
    //run function that takes platform and checks if it has percent or dollar
    //if platform is trademe dollar then the sold form needs to have a variable called feeDollar which holds the value.
    //the soldform needs to have the option of changing the variable depending on what the platform ends up being. This can be done using the spread operator on the object
    //the function could have a return of the correct looking object which then gets passed through to the database DONE

    function createSoldForm(platform, fee) {
      const completedSoldForm = {
        item,
        price,
        soldOrBought,
        shipping,
        // need to add platform,
        // need to add fees/dollars,
      }
      const fees = Number(fee)

      if (platform === 'trademe') {
        const platformAndFee = { platform: platform }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform === 'facebook') {
        const platformAndFee = { platform: platform }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('dollar') && platform.includes('trademe')) {
        const platformAndFee = { feeDollar: fees, platform: platform }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('dollar') && platform.includes('custom')) {
        const platformAndFee = { feeDollar: fees, platform: platform }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('percent') && platform.includes('trademe')) {
        const platformAndFee = { feePercentage: fees, platform: platform }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('percent') && platform.includes('custom')) {
        const platformAndFee = { feePercentage: fees, platform: platform }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform === 'nofee') {
        const platformAndFee = { platform: 'N/A' }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      }

      return
    }

    const percentOrDollarVariable = percentOrDollar(platform)

    const completedSoldForm = createSoldForm(platform, fees)

    // {
    //   item,
    //   price,
    //   soldOrBought,
    //   shipping,
    //   platform,
    //   fees,
    // }

    // await postFormData(completedBoughtForm)
    // console.log('testing', createSoldForm(platform, fees))
    // console.log('testing', completedSoldForm)
    mutateAddSoldTransaction.mutate(completedSoldForm)
    console.log(completedSoldForm, 'shipping', shipping)
    target.reset()
  }
  const queryClient = useQueryClient()
  const mutateAddSoldTransaction = useMutation({
    mutationFn: (
      completedBoughtForm,

      //   : {
      //   item: string
      //   price: string
      //   soldOrBought: string
      //   platform: string
      //   shipping: number
      //   fee: number
      // }
    ) => postFormData(completedBoughtForm),
    onSuccess: () => {
      setAdditionalInputVisible(false)
      setShippingInputVisible(false)
      queryClient.invalidateQueries(['items'])
    },
  })

  // function handleButtonClick(e) {
  //   e.preventDefault()
  // }

  function feeCalculation(platform: string, price: number) {
    let fee = 0

    if (platform === 'trademe') {
      fee = Number(price * trademeFee).toFixed(2)
    } else if (platform === 'facebook') {
      return
    }
    // console.log(fee)
    return fee
  }

  return (
    <div className="flex flex-col gap-20 justify-center items-center">
      <ToastContainer position="top-center" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#31363F] text-white shadow-gray-900/60 shadow-lg w-full max-w-full p-8">
          <p className="text-center mb-5 text-4xl font-jersey-25 uppercase">
            Sold
          </p>
          <div className="w-96 flex flex-col gap-5 items-center">
            <Input
              className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="itemsold"
              name="itemsold"
              placeholder="What have you sold?"
              label="What have you sold?"
              color="white"
            ></Input>
            <Input
              className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              id="howmuch"
              name="howmuch"
              placeholder="For how much?"
              label="For how much?"
              color="white"
            ></Input>
            {/* <label
              htmlFor="platform"
              className="text-white block w-half mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a platform/fee
            </label> */}
            <div className="w-full">
              <Select
                onChange={(e) => handleOptionChange(e)}
                value={value}
                label="Platform or Fee"
                // variant="static"
                // color="blue"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                labelProps={{
                  className: 'text-white',
                }}
                containerProps={{
                  className: 'bg-transparent',
                }}
                // value={value}
                id="platform"
                name="platform"
                className="text-white"
              >
                <Option value="nofee">No fee</Option>
                {/* <option value={selectedOption}>Choose an option</option> */}
                <Option value="trademe">TradeMe (7.9% Fee)</Option>
                <Option value="trademe-custom-percent">
                  TradeMe Custom Fee %
                </Option>
                <Option value="trademe-custom-dollar">
                  TradeMe Custom Fee $
                </Option>
                <Option value="facebook">Facebook</Option>
                <Option value="custom-percent">Custom fee %</Option>
                <Option value="custom-dollar">Custom $</Option>
              </Select>
            </div>
            {additionalInputVisible && (
              <Input
                required
                className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                id="custom-fee"
                name="custom-fee"
                placeholder="Enter custom amount"
                label="Enter custom amount"
                color="white"
              ></Input>
            )}
            <div className="w-full">
              <p className="text-white">
                Did you pay out of pocket for shipping?
              </p>
              <Card className="w-full max-w-[24rem] bg-transparent shadow-lg">
                <List className="flex-row">
                  <ListItem className="p-0">
                    <label
                      htmlFor="yesShipping"
                      className={
                        shippingInputVisible
                          ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                          : 'flex w-full cursor-pointer items-center px-3 py-2'
                      }
                    >
                      <ListItemPrefix className="mr-3">
                        <Radio
                          onChange={handleShippingChange}
                          value={'yes'}
                          name="shippingOption"
                          id="yesShipping"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: 'p-0 bg-transparent',
                          }}
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
                      htmlFor="noShipping"
                      className={
                        !shippingInputVisible
                          ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                          : 'flex w-full cursor-pointer items-center px-3 py-2'
                      }
                    >
                      <ListItemPrefix className="mr-3">
                        <Radio
                          onChange={handleShippingChange}
                          defaultChecked
                          value={'no'}
                          name="shippingOption"
                          id="noShipping"
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: 'p-0',
                          }}
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

              {/* <input
                onChange={handleShippingChange}
                type="radio"
                id="yesShipping"
                name="shippingOption"
                value="yes"
              />
              <label className="text-white" htmlFor="yesShipping">
                Yes
              </label>
              <input
                onChange={handleShippingChange}
                type="radio"
                id="noShipping"
                name="shippingOption"
                value="no"
                defaultChecked
              />
              <label className="text-white" htmlFor="noShipping">
                No
              </label> */}
            </div>
            {shippingInputVisible && (
              <Input
                required
                className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                id="shipping"
                name="shipping"
                label="Enter shipping amount"
                color="white"
              ></Input>
            )}
            <div className="w-full flex flex-row justify-between">
              <button className="relative group-hover:opacity-100 ml-1 mt-5 text-[#eee] hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                Submit
              </button>
              <span className="relative group-hover:opacity-100 ml-1 mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                <Link to={`/theledger`}>View Ledger</Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>

    // </div>
    // <div>
    //   <ToastContainer />
    //   <form onSubmit={(e) => handleSubmit(e)}>
    //     <label className="text-white" htmlFor="itemsold">
    //       Item sold
    //     </label>
    //     <input
    //       className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       type="text"
    //       id="itemsold"
    //       name="itemsold"
    //       placeholder="What have you sold?"
    //     ></input>
    //     <label className="text-white" htmlFor="howmuch">
    //       For how much?
    //     </label>
    //     <input
    //       className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       type="number"
    //       id="howmuch"
    //       name="howmuch"
    //       placeholder="For how much?"
    //     ></input>
    //     <label
    //       htmlFor="platform"
    //       className="block w-half mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //     >
    //       Select a platform/fee
    //     </label>
    //     <select
    //       onChange={handleOptionChange}
    //       id="platform"
    //       name="platform"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //     >
    //       <option value="nofee">No fee</option>
    //       {/* <option value={selectedOption}>Choose an option</option> */}
    //       <option value="trademe">TradeMe (7.9% Fee)</option>
    //       <option value="trademe-custom-percent">TradeMe Custom Fee %</option>
    //       <option value="trademe-custom-dollar">TradeMe Custom Fee $</option>
    //       <option value="facebook">Facebook</option>
    //       <option value="custom-percent">Custom fee %</option>
    //       <option value="custom-dollar">Custom $</option>
    //     </select>
    //     {additionalInputVisible && (
    //       <input
    //         required
    //         className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         type="number"
    //         id="custom-fee"
    //         name="custom-fee"
    //         placeholder="Enter custom amount"
    //       ></input>
    //     )}
    //     <div>
    //       <p className="text-white">Did you pay out of pocket for shipping?</p>
    //       <input
    //         onChange={handleShippingChange}
    //         type="radio"
    //         id="yesShipping"
    //         name="shippingOption"
    //         value="yes"
    //       />
    //       <label className="text-white" htmlFor="yesShipping">
    //         Yes
    //       </label>
    //       <input
    //         onChange={handleShippingChange}
    //         type="radio"
    //         id="noShipping"
    //         name="shippingOption"
    //         value="no"
    //         defaultChecked
    //       />
    //       <label className="text-white" htmlFor="noShipping">
    //         No
    //       </label>
    //     </div>
    //     {shippingInputVisible && (
    //       <input
    //         required
    //         className="block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         type="number"
    //         id="shipping"
    //         name="shipping"
    //         placeholder="Enter shipping amount"
    //       ></input>
    //     )}
    //     <button className="group-hover:opacity-100 ml-1 mt-5 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
    //       Submit
    //     </button>
    //   </form>
    //   <button className="group-hover:opacity-100 ml-1 mt-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
    //     <Link to={`/theledger`}>View Ledger</Link>
    //   </button>
    // </div>
  )
}

export default SoldForm
