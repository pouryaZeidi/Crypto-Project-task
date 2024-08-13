import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

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
          const response = await axios.get(`https://onchain.dextrading.com/walletsummary/${address}?network=eth`,    
          );
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
  console.log(data)

  const barChartData:any = data?.totalProfits?.month 
    ? Object.entries(data?.totalProfits.month).map(([month, values]:any) => ({
        name: month,
        buy: values.totalBuyAmounts || 0,
        sell: values.totalSellAmounts || 0,
        profit: values.totalBuyAmounts - values.totalSellAmounts
      }))
    : [];

  const lineChartData = data?.totalBuySellTimes?.month 
    ? Object.entries(data?.totalBuySellTimes.month).map(([month, values]:any) => ({
        name: month,
        total: (values.totalBuyTimes || 0) + (values.totalSellTimes || 0),
      }))
    : [];

  return (
    <div>
      <h2>Wallet Address Summary</h2>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <h3>Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar dataKey="buy" stackId="a" fill="#8884d8" yAxisId="left" />
              <Bar dataKey="sell" stackId="a" fill="#82ca9d" yAxisId="left" />
              <Bar dataKey="profit" stackId="a" fill={barChartData?.profit > 0 ? "#82ca9d" : "#ff4d4d"} yAxisId="left" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: '48%' }}>
          <h3>Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10000]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" yAxisId="right" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WalletAddress;
