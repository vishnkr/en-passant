import React,{useState,useEffect} from 'react';
import {
  PieChart, Pie, Legend, Tooltip,Cell,
  } from 'recharts';
  


function Chart() {
      const data01 = [
        { name: 'Win', value: 400 }, { name: 'Loss', value: 300 },
        { name: 'Draw', value: 20 }, 
      ];
      const COLORS = ['#769656', '#b33430', '#a7a6a1'];
      
      return (
        <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
          {
            data01.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
        
        <Tooltip />
      </PieChart>
      );
}

export default Chart;