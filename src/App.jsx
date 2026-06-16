import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [sumCost, setSumCost] = useState(0);
  const [avgDuration, setAvgDuration] = useState(0);
  const [totalSuccess, settotalSuccess] = useState(0);
  const [totalFail, settotalFail] = useState(0);


  useEffect(() => {
    const getMainCard = async () => {
      const url = "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr";
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);

        let total = 0;
        for (let i = 0; i < result.length; i++) {
          total += Number(result[i].callCost);
        }
        total = total.toFixed(2);

        setSumCost(total);

        let length = 0;
        for (let i = 0; i<result.length; i++){
          length += Number(result[i].callDuration);
        }
        length = length/result.length;
        setAvgDuration(length);

        let success = 0;
        for (let i = 0; i<result.length; i++){
          if(result[i].callStatus == true){
            success+=1;
          }
        }
        settotalSuccess(success);


      } catch (err) {
        console.error(err);
      }
    };

    getMainCard();
  }, []);

  return (
    <>
      <h1>Hello World!</h1>


      <h1 id="printNames">
        {data.map(item => item.callerName + " ")}
      </h1>

      <h1 id="printTotal">
        {data.length}
      </h1>

      <h1 id="printCallCost">
        {sumCost}
      </h1>

      <h1 id="printAvgDuration">
        {avgDuration}
      </h1>

      <h1 id="printTotalSuccess">
        {totalSuccess}
      </h1>

    </>
  );
}

export default App;