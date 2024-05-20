import React, { useEffect, useState } from 'react';
import './App.css';

import { LineChart, Line, XAxis, CartesianGrid, Legend, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const App = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch('/rate/all')
      .then(res => {
        res.json()
          .then(rates => {
            setRates(rates);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="App">
      <h1 >Cryptocurrency Rate Line Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
          data={rates}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" interval="preserveStartEnd" />
          <YAxis interval="preserveStartEnd" />
          <Tooltip formatter={(value) => "￥" + value.toLocaleString()} />
          <Legend />
          <Line type="monotone" name="bitcoin" dataKey="bitcoin.jpy" stroke="#F7931A" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="ethereum" dataKey="ethereum.jpy" stroke="#636467" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="bitcoin-cash" dataKey="bitcoin-cash.jpy" stroke="#8DC351" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="ethereum-classic" dataKey="ethereum-classic.jpy" stroke="#669073" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="litecoin" dataKey="litecoin.jpy" stroke="#A6A9AA" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="lisk" dataKey="lisk.jpy" stroke="#001a3e" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="monacoin" dataKey="monacoin.jpy" stroke="#ab8a4b" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="nem" dataKey="nem.jpy" stroke="#78B6E4" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="ripple" dataKey="ripple.jpy" stroke="#23292F" activeDot={{ r: 5 }} dot={false} />
          <Line type="monotone" name="iostoken" dataKey="iostoken.jpy" stroke="#000000" activeDot={{ r: 5 }} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;