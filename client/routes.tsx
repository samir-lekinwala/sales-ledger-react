import {
  BrowserRouter as Router,
  Route,
  Routes,
  createRoutesFromElements,
} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Bought from './pages/Bought'
import Inventory from './pages/Inventory'
import TheLedger from './pages/TheLedger'
import Sold from './pages/Sold'
import Edit from './pages/Edit'
import Completed from './pages/Completed'

// export default createRoutesFromElements(
//   <Router>
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="bought" element={<Bought />} />
//         {/* <Route path="/:id" element={<LocationDetails />} /> */}
//       </Route>
//       ,
//     </Routes>
//     ,
//   </Router>,
// )

export const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="bought" element={<Bought />} />
    <Route path="sold" element={<Sold />} />
    <Route path="sold/:boughtId" element={<Sold />} />
    <Route path="inventory" element={<Inventory />} />
    <Route path="/edit/:boughtOrSold/:id" element={<Edit />} />
    <Route path="theledger" element={<TheLedger />} />
    <Route path="completed" element={<Completed />} />
  </Route>,
)

export default routes
