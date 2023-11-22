import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="locations" element={<Locations />} />
    <Route path="/:id" element={<LocationDetails />} />
  </Route>,
)
