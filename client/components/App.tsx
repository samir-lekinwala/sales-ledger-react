// import { useFruits } from '../hooks/useFruits.ts'
// import Footer from './Footer.tsx'
// import { useQuery } from '@tanstack/react-query'
// import { getAllItems } from '../apis/fruits.ts'
import Home from './Home.tsx'
import Layout from './Layout.tsx'
// import { ToastContainer } from 'react-toastify'

function App() {
  // const { data } = useFruits()

  return (
    <>
      {/* <ToastContainer position="top-center" draggablePercent={50} /> */}
      <Layout />
      <Home />
      <div className="app">
        {/* <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul> */}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App
