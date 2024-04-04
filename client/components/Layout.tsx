import React, { useState } from 'react'
import BurgerMenu from './BurgerMenu'
import { Outlet } from 'react-router-dom'
import Footer from './LedgerFooter'
import { getAllItems } from '../apis/fruits'
import { useQuery } from '@tanstack/react-query'

function Layout() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
  })
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return console.error(error)
  // console.log(data)
  // const [burgerMenuClick, setBurgerMenuClick] = useState(false)

  // function handleBurgerMenuClick() {
  //   setBurgerMenuClick(!burgerMenuClick)
  //   console.log(burgerMenuClick)
  // }

  return (
    <div>
      {/* <h1 onClick={handleBurgerMenuClick} className="bg-red-200">
        Sales Ledger
      </h1> */}
      <div className="burgermenu-container">
        <BurgerMenu
          data={data.body}
          // burgermenuclick={setBurgerMenuClick}
          // menuStatus={burgerMenuClick}
        />
        {/* {burgerMenuClick ? (
          <>
            <BurgerMenu burgermenuclick={setBurgerMenuClick} />
          </>
        ) : (
          <span
            className="burgermenu float-right"
            onClick={handleBurgerMenuClick}
          >
            dsad
          </span>
        )} */}
      </div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
