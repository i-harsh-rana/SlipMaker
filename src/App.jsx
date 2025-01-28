import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slip from './Slip'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Slip/>
    </>
  )
}

export default App
