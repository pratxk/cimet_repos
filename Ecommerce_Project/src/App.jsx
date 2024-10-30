import './App.css'
import AllRoutes from './routes/AllRoutes'
import { ProductContextProvider } from './Context/ProductContext'

function App() {
  return (
    <>
      <ProductContextProvider>
        <AllRoutes />
      </ProductContextProvider>
    </>
    
  )
}

export default App
