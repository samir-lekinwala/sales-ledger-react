import { Link } from 'react-router-dom'

function BuyorSell() {
  return (
    <ul>
      <li>
        <Link to={`/bought`}>Bought</Link>
      </li>
      <li>
        <Link to="/sold">Sold</Link>
      </li>
    </ul>
  )
}

export default BuyorSell
