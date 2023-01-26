import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';
import { padding } from '@mui/system';
import { orderService } from '../services/order.service';

ChartJS.register(RadialLinearScale,ArcElement, Tooltip, Legend);


export function DashboardTable({orders}) {
    const labels = ['pending', 'approved', 'declined']
    const data = {
        labels,
        datasets: [
            {
                label: 'number of Votes',
                data: labels.map(label=>orderService.getStatusPrec(label,orders)),
                backgroundColor: [
                    '#ffbb33',
                    '#00C851',
                    '#ff4444',

                ],
                borderColor: [
                    '#ffbb33',
                    '#00C851',
                    '#ff4444',
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <div style={{width:'60%', margin:'auto', height:'368px', padding:'16px 0'}}>
            <Doughnut data={data} />
        </div>
    )
}
