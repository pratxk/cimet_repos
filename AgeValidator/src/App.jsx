import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AgeValidator from './pages/AgeValidator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AgeValidator/>
    </>
  )
}

export default App
