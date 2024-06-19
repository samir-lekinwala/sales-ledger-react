import BurgerMenu from './BurgerMenu'
import { Outlet } from 'react-router-dom'
import { getAllItems } from '../apis/api'
import { useQuery } from '@tanstack/react-query'
import { SpeedDialPlacement } from './SpeedDial'

import Heading from './Heading'
import { ToastContainer } from 'react-toastify'

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
      <Heading />
      <ToastContainer
        draggable
        stacked
        position="top-center"
        draggablePercent={50}
      />
      <BurgerMenu data={data.body} />
      <Outlet />
      <SpeedDialPlacement />
    </div>
  )
}

export default Layout
