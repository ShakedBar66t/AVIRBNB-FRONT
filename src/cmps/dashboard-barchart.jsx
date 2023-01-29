import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { orderService } from '../services/order.service';
import { useSelector } from 'react-redux';
import { MonthlyIcome } from '../customHooks/getMonthlyIncome';

// import {faker} from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
      display:false,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
    tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    }

    
  },
};


const labels = ["January", "February", "March", "April", "May",
"June", "July", "August", "September", "October", "November", "December"];
// const orders = useSelector(storeState => storeState.orderModule.orders)
export const data = {
  labels,
  datasets: [
    {
        label: 'Dataset 1',
        // data:MonthlyIcome(),
        data:[200,300,400,500,600,300,300],
        backgroundColor: '#00A699',

    }
  ],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
};

export function BarChart() {
  return <Bar options={options} data={data}  height="110vw"  />;
}
