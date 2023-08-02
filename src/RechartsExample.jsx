


import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RechartsExample = ({ coinData, coinName }) => {
  return (
    <LineChart width={600} height={300} data={coinData}>
      <Line type="monotone" dataKey="closePrice" stroke="#2196F3" strokeWidth={3} />
      <CartesianGrid stroke="#ccc" />
      <XAxis
        dataKey="timestamp"
        scale="auto" // Use "auto" scale for X-axis to handle timestamps
        tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} // Format X-axis tick labels
      />
      <YAxis domain={['auto', 'auto']} /> 
      <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} /> 
      <Legend />
    </LineChart>
  );
};

export default RechartsExample;
