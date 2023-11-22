import React, { useState } from 'react'
import BurgerMenu from './BurgerMenu'

function Layout() {
  const [burgerMenuClick, setBurgerMenuClick] = useState(false)

  function handleBurgerMenuClick() {
    setBurgerMenuClick(!burgerMenuClick)
    console.log(burgerMenuClick)
  }

  return (
    <div>
      <h1 onClick={handleBurgerMenuClick}>Sales Ledger</h1>
      <div className="burgermenu-container">
        {burgerMenuClick ? (
          <>
            <BurgerMenu />
          </>
        ) : (
          <span className="burgermenu" onClick={handleBurgerMenuClick}>
            dsad
          </span>
        )}
      </div>
    </div>
  )
}

export default Layout
