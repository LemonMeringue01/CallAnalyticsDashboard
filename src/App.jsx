import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  async function getMainCard() {
    const url = "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr"
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      for (let i = 0; i < result.length; i++) {
        document.getElementById('printData').innerHTML += result[i]["callerName"] +" ";
      }
      console.log(result[0]["callerName"]);

    } catch (error) {
      console.error(error.message);
    }
  }

  getMainCard();

  return (
    <>
      
      <h1>Hello World!</h1>
      <h1 id = "printData">This should change</h1>
      <button /*onClick={getMainCard}*/>Load Data</button>
    </>
  )
}

export default App