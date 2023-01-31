import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { orderService } from '../services/order.service'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    }
  }
}

const labels = ["Jauary", "Feb", "Mar", "Apr", "May",
  "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function BarChart({ orders, year }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: orderService.getMonthlyIncome(orders, year),
        backgroundColor: '#00A699',
        
      }
    ],

  }
  return <Bar options={options} data={data}  width={"100%"} height={"35vh"} />
}
