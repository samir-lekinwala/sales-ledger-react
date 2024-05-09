import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface props {
  boughtOrSold: string
}

function BuyorSell(props: props) {
  const [boughtOrSold, setBoughtOrSold] = useState(props.boughtOrSold)

  function handleButtonClick(option: string) {
    setBoughtOrSold(option)
  }

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
            // </Link>
            <Link to="/bought">
              <Button
                onClick={() => handleButtonClick('bought')}
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
            <Link to="/sold">
              <Button
                onClick={() => handleButtonClick('sold')}
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
