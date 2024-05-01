import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Heading() {
  return (
    <>
      <div>
        {/* <div className=" w-6 h-6 absolute text-center top-2"> */}
        {/* <Logo /> */}
        {/* </div> */}
        <header className="text-white w-full text-2xl absolute text-center top-2">
          <Link to="/">
            <div className="inline-block relative top-1 mr-2 outline-white">
              <Logo />
            </div>
            Sales Ledger
          </Link>
        </header>
      </div>
    </>
  )
}

export default Heading
