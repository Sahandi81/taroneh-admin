import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ['پسته', 'بادام هندی', 'تخمه', 'میوه خشک', 'گردو'],
  datasets: [
    {
      data: [15, 11, 5, 7, 9],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }
  ]
};

const options = {
  responsive: true,
  layout: {
    padding: 10
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      rtl: true,
      labels: {
        padding: 20,
        font: {
          family: "'IRANSans', 'sans-serif'"
        }
      }
    }
  },
  scales: {
    xAxes: {
      display: false,
      ticks: {
        font: {
          family: "'IRANSans', 'sans-serif'"
        }
      }
    },
    yAxes: {
      display: false,
      ticks: {
        font: {
          family: "'IRANSans', 'sans-serif'"
        }
      }
    }
  }
};

export default function TopProducts({data}) {
          const names =[];
          const counts = []
          data.map(mp=>{
              names.push(mp.title);
              counts.push(mp.sales_number)
          })
          chartData.labels = names;
          chartData.datasets[0].data = counts;
  return data &&<Doughnut data={chartData} options={options} />
}
