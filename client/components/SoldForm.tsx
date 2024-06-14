import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getItem, patchFormData, postFormData } from '../apis/fruits'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { item } from '../models/items'

interface CompletedSoldForm {
  id?: number | undefined
  item: string
  price: number
  soldOrBought: string
  shipping: number
  platform: string
  feeDollar?: number | undefined
  feePercent?: number | undefined
  feePercentage?: number | undefined
  created_at?: string | undefined
  potentialSalePrice?: number | undefined
}

interface props {
  data?: item
  children: JSX.Element
  shipping: number
}

function SoldForm({ children, data }: props) {
  const navigate = useNavigate()

  const { boughtId } = useParams()

  let testingData: number
  const [boughtData, setBoughtData] = useState<item>()

  async function getBoughtData() {
    const response = await getItem(Number(boughtId))

    const data = JSON.parse(response.text)
    return data[0]
  }

  useEffect(() => {
    const fetchBoughtData = async () => {
      try {
        const data = await getBoughtData()
        setBoughtData(data)
      } catch (error) {
        console.error('Failed to fetch bought data', error)
      }
    }

    fetchBoughtData()
  }, [boughtId])

  const trademeFee = 0.079 //7.9%

  // const [value, setValue] = React.useState('nofee')
  // const [selectedOption, setSelectedOption] = useState('nofee')
  const [selectedOption, setSelectedOption] = useState('nofee')
  const [selectedShipping, setSelectedShipping] = useState('')
  const [additionalInputVisible, setAdditionalInputVisible] = useState(false)
  const [shippingInputVisible, setShippingInputVisible] = useState(false)
  const [radioButton, setRadioButton] = useState(false)
  const [radioButtonNo, setRadioButtonNo] = useState(true)
  const [tempData, setTempData] = useState()
  // const [tempData2, setTempData2] = useState()
  const [customFeeAmount, setCustomFeeAmount] = useState(0)
  const [id, setId] = useState<number | null>()
  const [soldItem, setSoldItem] = useState()
  // const [tempShipping, setTempShipping] = useState(testingData)

  useEffect(() => {
    changeShippingInputIfDataExists()
    // selectedPlatformIfDataExists()
    customAmountFromData()
  }, [data, selectedOption, customFeeAmount])

  useEffect(() => {
    // changeShippingInputIfDataExists()
    selectedPlatformIfDataExists()
    // customAmountFromData()
    getId()
  }, [data])

  function getId() {
    if (data?.id) {
      setId(data.id)
      console.log('console.log item id', id)
    }
  }
  // useEffect(() => {
  //   // changeShippingInputIfDataExists()
  //   customAmountFromData()
  //   selectedPlatformIfDataExists()
  //   // customAmountFromData()
  // }, [])

  function changeShippingInputIfDataExists() {
    testingData = data?.shipping

    if (testingData > 0) {
      // if (data?.shipping != undefined && data?.shipping > 0) {
      setRadioButton(true)
      setShippingInputVisible(true)
      setRadioButtonNo(false)
    }
  }

  function customAmountFromData() {
    let customFee = 0
    if (selectedOption.includes('custom')) {
      setAdditionalInputVisible(true)
      if (data?.feeDollar > data?.feePercentage) {
        customFee = data?.feeDollar
        setCustomFeeAmount(customFee)
      } else if (data?.feeDollar < data?.feePercentage) {
        customFee = data?.feePercentage
        setCustomFeeAmount(customFee)
      }
    } else {
      setCustomFeeAmount(0)
      setAdditionalInputVisible(false)
    }
    console.log('selectedoption from func', selectedOption)
    console.log('customfeeamount', customFeeAmount)
  }

  function selectedPlatformIfDataExists() {
    const checkOption = selectedOption
    if (data?.platform) {
      const platformData = data.platform
      if (platformData != selectedOption) {
        console.log('test asbjhdbajhsdb', platformData, selectedOption)
      }
      console.log('console logging platformdata', platformData)
      console.log('checkoption', checkOption)
      setSelectedOption(data?.platform)
      console.log('selected option', selectedOption)
    }
  }

  function handleOptionChange(e) {
    const selectedValue = e

    setSelectedOption(selectedValue)
    // setValue(selectedValue)

    // You can customize this condition based on the option that should trigger showing additional fields
    if (
      selectedValue.includes('custom')
      // selectedValue === 'trademe-custom' || selectedValue === 'custom'
    ) {
      setAdditionalInputVisible(true)
    } else {
      setAdditionalInputVisible(false)
      setCustomFeeAmount(0)
    }
    console.log('additional input visible', additionalInputVisible)
  }

  // const handleShippingChange = e => {
  //   setSelectedShipping(e.target.value)
  // }

  function handleShippingChange(e) {
    console.log('I am handle shipping func')
    const selectedValue = e.target.value
    setSelectedShipping(selectedValue)
    console.log(radioButton)

    // You can customize this condition based on the option that should trigger showing additional fields
    if (
      selectedValue === 'yes'
      // selectedValue === 'trademe-custom' || selectedValue === 'custom'
    ) {
      setRadioButtonNo(false)
      setShippingInputVisible(true)
      setRadioButton(true)
    } else if (selectedValue === 'no') {
      setShippingInputVisible(false)
      setRadioButton(false)
      setRadioButtonNo(true)
      // const temppData = { ...tempData, shipping: 0 }
      setTempData({ ...tempData, shipping: 0 })
      console.log('tempdata5', tempData.shipping)
      // console.log('radio?', radioButton)
    }
  }

  function percentOrDollar(string: string) {
    if (string.includes('dollar')) return 'dollar'
    else return 'percent'
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // console.log(event)
    event.preventDefault()

    const target = event.currentTarget
    const form = new FormData(target)
    // console.log(form)
    const item = form.get('itemsold')?.valueOf() as string
    setSoldItem(item)
    const price = Number(form.get('howmuch')?.valueOf() as string)
    // const platform = form.get('platform')?.valueOf() as string
    const platform = selectedOption
    let shipping = form.get('shipping')?.valueOf() as number
    const fees = form.get('custom-fee')?.valueOf() as number
    console.log('fees from handlesubmit', fees)
    const soldOrBought = 'sold'
    const fee = feeCalculation(platform, Number(price)) as number

    // console.log('platform', platform, 'shipping', shipping)
    // notify('success', `${item} successfully added to your ledger`)
    // const inStock = form.get('inStock')?.valueOf() as number

    //need to take what the custom fee percentages are or dollars are from input and have a function
    //that returns a soldForm based on that output which matches the database naming and structure
    //input comes in as custom-fee
    //run function that takes platform and checks if it has percent or dollar
    //if platform is trademe dollar then the sold form needs to have a variable called feeDollar which holds the value.
    //the soldform needs to have the option of changing the variable depending on what the platform ends up being. This can be done using the spread operator on the object
    //the function could have a return of the correct looking object which then gets passed through to the database DONE

    function createSoldForm(platform: string, fee: number) {
      if (selectedShipping == 'no') {
        shipping = 0
      }
      console.log('shipping, create sold form function', shipping)
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
        const platformAndFee = {
          platform: platform,
          feeDollar: 0,
          feePercentage: 0,
        }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('dollar') && platform.includes('trademe')) {
        const platformAndFee = {
          feeDollar: fees,
          feePercentage: 0,
          platform: platform,
        }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('dollar') && platform.includes('custom')) {
        const platformAndFee = {
          feeDollar: fees,
          feePercentage: 0,
          platform: platform,
        }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('percent') && platform.includes('trademe')) {
        const platformAndFee = {
          feePercentage: fees,
          feeDollar: 0,
          platform: platform,
        }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform.includes('percent') && platform.includes('custom')) {
        const platformAndFee = {
          feePercentage: fees,
          feeDollar: 0,
          platform: platform,
        }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      } else if (platform === 'nofee') {
        const platformAndFee = {
          platform: 'nofee',
          feePercentage: 0,
          feeDollar: 0,
        }
        const completedTestSoldForm = {
          ...completedSoldForm,
          ...platformAndFee,
        }
        return completedTestSoldForm
      }

      return
    }

    // const percentOrDollarVariable = percentOrDollar(platform)
    const completedSoldForm = createSoldForm(platform, fees)

    let editedCompleteSoldForm
    if (id) {
      console.log('id for edit', id)
      editedCompleteSoldForm = { ...completedSoldForm, id: id }
      console.log('edited completed sold form', editedCompleteSoldForm)
      mutateEditBoughtTransaction.mutate(editedCompleteSoldForm)
    } else if (boughtId) {
      const boughtToSoldForm = {
        ...completedSoldForm,
        bought_Id: Number(boughtId),
      }
      console.log(boughtToSoldForm)
      mutateEditBoughtTransaction.mutate({ id: Number(boughtId), inventory: 0 })
      mutateAddSoldTransaction.mutate(boughtToSoldForm)
      navigate('/inventory')
      target.reset()
    } else {
      mutateAddSoldTransaction.mutate(completedSoldForm)
      // console.log(completedSoldForm, 'shipping', shipping)
      target.reset()
    }
  }
  const queryClient = useQueryClient()
  const mutateAddSoldTransaction = useMutation({
    mutationFn: (
      completedBoughtForm: CompletedSoldForm,

      //   : {
      //   item: string
      //   price: string
      //   soldOrBought: string
      //   platform: string
      //   shipping: number
      //   fee: number
      // }
    ) => postFormData(completedBoughtForm),
    onSuccess: (e) => {
      if (boughtId) {
        mutateEditBoughtTransaction.mutate({
          id: Number(boughtId),
          bought_Id: Number(e),
        })
        console.log('console logging e', e)
      }
      setAdditionalInputVisible(false)
      setShippingInputVisible(false)
      setSelectedOption('nofee')
      queryClient.invalidateQueries(['items'])
      queryClient.invalidateQueries(['item'])
      notify('success', `${soldItem} has been added to the ledger`)
    },
  })

  const mutateEditBoughtTransaction = useMutation({
    mutationFn: (
      editedCompleteSoldForm: CompletedSoldForm,
      //   {
      //   id: number
      //   item: string
      //   price: string
      //   soldOrBought: string
      //   shipping: number
      //   potentialSalePrice: number
      //   platform: string
      // }
    ) => patchFormData(editedCompleteSoldForm),
    onSuccess: () => {
      notify('success', `${data?.item} has been updated`)
      queryClient.invalidateQueries(['item'])
      queryClient.invalidateQueries(['items'])
    },
  })

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
    <div>
      {data != null ? (
        <div className="flex flex-col gap-20 justify-center items-center">
          <ToastContainer position="top-center" />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#31363F] text-white shadow-gray-900/60 shadow-lg sm:w-full sm:p-8 p-8 pb-10">
              <p className="text-center mb-5 text-4xl font-jersey-25 uppercase">
                Edit
              </p>
              {children}
              <div className="sm:w-96 flex flex-col gap-5 w-full items-center">
                <Input
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="itemsold"
                  name="itemsold"
                  placeholder="What have you sold?"
                  label="What have you sold?"
                  color="white"
                  defaultValue={data.item}
                  crossOrigin={undefined}
                ></Input>
                <Input
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="howmuch"
                  name="howmuch"
                  placeholder="For how much?"
                  label="For how much?"
                  color="white"
                  defaultValue={data.price}
                  crossOrigin={undefined}
                ></Input>
                <div className="w-full">
                  <Select
                    onChange={(e) => handleOptionChange(e)}
                    label="Platform or Fee"
                    value={data.platform}
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
                {additionalInputVisible || customFeeAmount > 0 ? (
                  // data.feeDollar > 0 ||
                  // data.feePercentage > 0
                  <Input
                    required
                    className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="custom-fee"
                    name="custom-fee"
                    placeholder="Enter custom amount"
                    label="Enter custom amount"
                    color="white"
                    defaultValue={customFeeAmount}
                    crossOrigin={undefined}
                  ></Input>
                ) : null}
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
                            radioButton
                              ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                              : 'flex w-full cursor-pointer items-center px-3 py-2'
                          }
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              onChange={handleShippingChange}
                              checked={radioButton}
                              value={'yes'}
                              name="shippingOption"
                              id="yesShipping"
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
                          htmlFor="noShipping"
                          className={
                            radioButtonNo
                              ? 'bg-[#76ABAE] flex w-full cursor-pointer items-center px-3 py-2'
                              : 'flex w-full cursor-pointer items-center px-3 py-2'
                          }
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              onChange={handleShippingChange}
                              checked={radioButtonNo}
                              value={'no'}
                              name="shippingOption"
                              id="noShipping"
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
                {radioButton == true ? (
                  <Input
                    required
                    className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="shipping"
                    name="shipping"
                    label="Enter shipping amount"
                    color="white"
                    defaultValue={data.shipping}
                    crossOrigin={undefined}
                  ></Input>
                ) : null}
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
      ) : (
        <div className="flex flex-col gap-20 justify-center items-center">
          <ToastContainer position="top-center" />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-[#31363F] text-white shadow-gray-900/60 shadow-lg sm:w-full sm:p-8 p-8 pb-10">
              <p className="text-center mb-5 text-4xl font-jersey-25 uppercase">
                Sold
              </p>
              <div className="sm:w-96 flex flex-col gap-5 items-center">
                <Input
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="itemsold"
                  name="itemsold"
                  placeholder="What have you sold?"
                  label="What have you sold?"
                  color="white"
                  crossOrigin={undefined}
                  value={boughtId ? boughtData?.item : undefined}
                ></Input>
                <Input
                  className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="howmuch"
                  name="howmuch"
                  placeholder="For how much?"
                  label="For how much?"
                  color="white"
                  crossOrigin={undefined}
                ></Input>
                <div className="w-full">
                  <Select
                    onChange={(e) => handleOptionChange(e)}
                    value={selectedOption}
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
                    crossOrigin={undefined}
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
                {shippingInputVisible && (
                  <Input
                    required
                    className="focus:ring-0 block w-half p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="shipping"
                    name="shipping"
                    label="Enter shipping amount"
                    color="white"
                    crossOrigin={undefined}
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
      )}
    </div>
  )
}

export default SoldForm
