import React from 'react'

function BurgerMenu() {
  return (
    <div>
      <ul className="float-right">
        <li>
          <a href="#">Add Item</a>
        </li>
        <li>
          <a href="#">Inventory</a>
        </li>
        <li>
          <a href="#">The Ledger</a>
        </li>
        <li>
          <a href="#">Account</a>
        </li>
        <li>
          <a href="#">Sign Out</a>
        </li>
      </ul>
    </div>
  )
}

export default BurgerMenu
