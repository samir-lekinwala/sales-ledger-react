import { Link } from 'react-router-dom'
import Logo from './Logo'

function Heading() {
  return (
    <>
      <div className="relative mb-2 bottom-2">
        {/* <div className=" w-6 h-6 absolute text-center top-2"> */}
        {/* <Logo /> */}
        {/* </div> */}
        <header className="text-white w-full text-2xl absolute text-center top-2">
          <Link to="/">
            <div className="inline-block sm:bottom-8 relative top-1 mr-2 outline-white">
              <Logo width={60} classes={'sm:relative sm:bottom-4'} />
            </div>
            <h1 className="inline-block sm:bottom-2 relative mr-2 outline-white sm:text-5xl text-2xl font-poppins">
              Sales Ledger
            </h1>
          </Link>
        </header>
      </div>
    </>
  )
}

export default Heading
