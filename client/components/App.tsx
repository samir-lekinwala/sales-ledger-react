// import { useFruits } from '../hooks/useFruits.ts'
// import Footer from './Footer.tsx'
import { useQuery } from '@tanstack/react-query'
import { getAllItems } from '../apis/fruits.ts'
import Home from './Home.tsx'
import Layout from './Layout.tsx'

function App() {
  // const { data } = useFruits()

  return (
    <>
      <Layout data={data} />
      <Home data={data} />
      <div className="app">
        {/* <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul> */}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App
