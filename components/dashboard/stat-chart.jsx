import 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
};

const options = {
  responsive: true,
  layout: {
    padding: 20
  },
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    xAxes: {
      ticks: {
        font: {
          family: "'IRANSans', 'sans-serif'"
        }
      }
    },
    yAxes: {
      ticks: {
        font: {
          family: "'IRANSans', 'sans-serif'"
        }
      }
    }
  }
};

export default function StatChart({data}) {
        const fullDataMonth = [];
        
        // for(let i =0; data.length > i - 1 ; i++){
        //   const sortMonth = data[i][0].split('/')[1] * 1 ;

        //       if(i === 0){
        //           fullDataMonth.push(data[i])
        //           console.log(fullDataMonth)
        //       }else if(i !== 0 && fullDataMonth[i - 1][0].split('/')[1] * 1 !== sortMonth -1 ){
        //         const between = sortMonth - fullDataMonth[i - 1][0].split('/')[1] * 1;
        //         console.log(between,'bet')
        //         //  for(let j = 0; between > i ; j++){
        //             const yaerStr = fullDataMonth[i - 1][0].split('/')[1] * 1 !== 12? fullDataMonth[i - 1][0].slice(0,5): fullDataMonth[i - 1][0].slice(0,4) * 1 + 1 + '/'          
        //             const monthStr = fullDataMonth[i - 1][0].split('/')[1] * 1 !== 12? sortMonth -1 : 1
        //             console.log(yaerStr, monthStr, String(yaerStr + monthStr),i)
        //             fullDataMonth.push([String(yaerStr + monthStr), 0])
        //         //  }
        //         // i = i - 1;
        //         // return;
        //       }else if(i !== 0 && fullDataMonth[i - 1][0].split('/')[1] * 1 === sortMonth -1 ){
        //         fullDataMonth.push(data[i])
        //       }
        // }

        // for(let i =0; 12 > 0; i++){

        // }
        // console.log(fullDataMonth)



        let someBuy =[]
        let month =[]
        const mn = ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
        data?.map(el=>{
            someBuy.push(el[1].count);
            const nameMonth = el[0].split('/')[1] * 1;
            
            month.push(mn[nameMonth])
        })
       
        chartData.labels = month.reverse()
        chartData.datasets[0].data = someBuy.reverse() 
  return month.length&& <Line options={options} data={chartData} />;
}
