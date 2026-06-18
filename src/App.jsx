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
  const [longCall, setLongCall] = useState(0);


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

        let fail = 0;
        for (let i = 0; i<result.length; i++){
          if(result[i].callStatus == false){
            fail+=1;
          }
        }
        settotalFail(fail);

        let longCall = result[0].callDuration;
        for (let i = 1; i<result.length; i++){
          if(result[i].callDuration > longCall){
            longCall = result[i].callDuration;
          }
        }
        setLongCall(longCall);


      } catch (err) {
        console.error(err);
      }
    };

    getMainCard();
  }, []);

  return (
    <>
    
    <h1>Call Analytics</h1>

      <div id = "mainCard">
        <table>
          <tr>
            <td>Total Calls</td>
          </tr>
          <tr>
            <td>{data.length}</td>
          </tr>
        </table>
              <table>
          <tr>
            <td>Total Calls Cost</td>
          </tr>
          <tr>
            <td>{sumCost}</td>
          </tr>
        </table>
              <table>
          <tr>
            <td>Average Call Duration</td>
          </tr>
          <tr>
            <td>{avgDuration}</td>
          </tr>
        </table>
              <table>
          <tr>
            <td>Total Successful Calls</td>
          </tr>
          <tr>
            <td>{totalSuccess}</td>
          </tr>
        </table>
              <table>
          <tr>
            <td>Total Failed Calls</td>
          </tr>
          <tr>
            <td>{totalFail}</td>
          </tr>
        </table>
      </div>

      <div id = "callDurationCard">
        <table>
          <tr>
            <td>Longest Call</td>
          </tr>
          <tr>
            <td>{longCall}s</td>
          </tr>
        </table>

      </div>

    </>
  );
}

export default App;