// import { useFruits } from '../hooks/useFruits.ts'
// import Footer from './Footer.tsx'
import Home from './Home.tsx'
import Layout from './Layout.tsx'

function App() {
  // const { data } = useFruits()

  return (
    <>
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