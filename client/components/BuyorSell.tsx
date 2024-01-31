import { Link } from 'react-router-dom'

function BuyorSell() {
  return (
    <ul className="text-white">
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
