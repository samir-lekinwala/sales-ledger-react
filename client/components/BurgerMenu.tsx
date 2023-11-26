import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  burgermenuclick: React.Dispatch<React.SetStateAction<boolean>>
}

function BurgerMenu(props: Props) {
  return (
    <div>
      <ul className="float-right">
        <li>
          <Link to="/" onClick={() => props.burgermenuclick()}>
            Add Item
          </Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="theledger">The Ledger</Link>
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
