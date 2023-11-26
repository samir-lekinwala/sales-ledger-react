import React, { useState } from 'react'
import BurgerMenu from './BurgerMenu'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  const [burgerMenuClick, setBurgerMenuClick] = useState(false)

  function handleBurgerMenuClick() {
    setBurgerMenuClick(!burgerMenuClick)
    console.log(burgerMenuClick)
  }

  return (
    <div>
      <h1 onClick={handleBurgerMenuClick} className="bg-red-200">
        Sales Ledger
      </h1>
      <div className="burgermenu-container">
        {burgerMenuClick ? (
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
        )}
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
