import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  async function getData() {
    const url = "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr"
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={getData}>Load Data</button>
    </>
  )
}

export default App