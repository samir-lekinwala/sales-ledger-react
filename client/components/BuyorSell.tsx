import { Button } from '@material-tailwind/react'
// import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { item } from '../models/items'

interface props {
  data?: item
  boughtOrSold: string
  id: number
}

function BuyorSell(props: props) {
  // const [boughtOrSold, setBoughtOrSold] = useState(props.boughtOrSold)

  // const { data } = props2

  const id = useParams()
  console.log('use params', id, props.data?.id, props.id)

  console.log('test123', props.boughtOrSold)

  // function handleButtonClick(option: string) {
  //   // setBoughtOrSold(option)
  // }

  return (
    <div>
      <ul className="text-white flex items-center justify-center gap-2 mb-5">
        <li>
          {props.boughtOrSold == 'bought' ? (
            // <Link to={`/bought`}>
            <Button
              // variant="outlined"
              className="bg-[#76ABAE] hover:bg-[#EEEEEE] hover:text-black"
            >
              Bought
            </Button>
          ) : (
            // ? (
            // <Link to={`/edit/30`}>
            //   <Button
            //     onClick={() => handleButtonClick('bought')}
            //     className="hover:bg-[#EEEEEE] hover:text-black"
            //   >
            //     Bought
            //   </Button>
            // </Link>
            // ) :

            // </Link>
            <Link to={`/edit/bought/${props.id}`}>
              <Button
                // onClick={() => handleButtonClick('bought')}
                className="hover:bg-[#EEEEEE] hover:text-black"
              >
                Bought
              </Button>
            </Link>
          )}
        </li>
        <li>
          {props.boughtOrSold == 'sold' ? (
            // <Link to={`/bought`}>
            <Button
              // variant="outlined"
              className="bg-[#76ABAE] hover:bg-[#EEEEEE] hover:text-black"
            >
              Sold
            </Button>
          ) : (
            // </Link>
            <Link to={`/edit/sold/${props.id}`}>
              <Button
                // onClick={() => handleButtonClick('sold')}
                className="hover:bg-[#EEEEEE] hover:text-black"
              >
                Sold
              </Button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default BuyorSell
