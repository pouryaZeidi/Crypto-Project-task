import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const WalletAddress = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (address) {
          const response = await axios.get(`https://onchain.dextrading.com/walletsummary/${address}?network=eth`);
          setData(response.data);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [address]);

 
  const lineChartData = data?.totalBuySellTimes?.month
    ? Object.entries(data.totalBuySellTimes.month).map(([month, value]: any) => ({
        name: month,
        totalBuyTimes: data.totalBuyTimes.month[month],
        totalSellTimes: data.totalSellTimes.month[month],
      }))
    : [];

  
  const barChartData = data?.totalBuyAmounts?.month && data?.totalSellAmounts?.month
    ? Object.keys(data.totalBuyAmounts.month).map(month => ({
        name: month,
        buy: data.totalBuyAmounts.month[month],
        sell: data.totalSellAmounts.month[month],
        netProfit: data.netProfit?.month?.[month] , 
      }))
    : [];

  const yAxisDomainLeft = [0, 1000000];
  const yAxisDomainRight = [0, 1500000];  

  return (
    <div className="bg-[rgb(18,20,22)] p-4">
      <h2 className="text-white">Wallet Address Summary</h2>

     
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" domain={yAxisDomainLeft} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalBuyTimes" stroke="#8884d8" yAxisId="left" />
              <Line type="monotone" dataKey="totalSellTimes" stroke="#82ca9d" yAxisId="left" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={barChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" domain={yAxisDomainLeft} />
            <YAxis yAxisId="right" orientation="right" domain={yAxisDomainRight} />
            <Tooltip />
            <Legend />
            <Bar dataKey="buy" stackId="a" fill="#0000FF" yAxisId="left"/>
            <Bar dataKey="sell" stackId="a" fill="#FF0000" yAxisId="left"/>
            <Line type="monotone" dataKey="netProfit" stroke="#FFBB28" yAxisId="right" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WalletAddress;
