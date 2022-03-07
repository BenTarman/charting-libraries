import React from "react";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
	BarElement,
    Title,
    Tooltip,
    Legend,
	ArcElement,
	Filler,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";


Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
	BarElement,
	ArcElement,
	Filler,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
			fill: {
                target: 'origin',
                above: "rgba(255, 99, 132, 0.2)",  
                below: "rgba(255, 99, 132, 0.2)",    
              },
            label: "Dataset 1",
            data: [10000, 12038, 9999, 8369],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};


const LineChart = () => <Line options={options} data={data} />






const options2 = {
	responsive: true,
	plugins: {
	  legend: {
		position: 'top',
	  },
	  title: {
		display: true,
		text: 'Chart.js Bar Chart',
	  },
	},
  };
  

const data2 = {
	labels,
	datasets: [
	  {
		label: 'Dataset 1',
		data: [10000, 12038, 9999, 8369],
		backgroundColor: 'rgba(255, 99, 132, 0.5)',
	  }
	],
  };

  const BarChart = () => <Bar options={options2} data={data2} />




const data3 = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
	  {
		label: '# of Votes',
		data: [12, 19, 3, 5],
		backgroundColor: [
			'#5E15D4', '#1A105A', '#885BD0', '#AE95D7'
		],
		borderColor: 'white',
		borderWidth: 5,
	  },
	],
  };


  const PieChart = () => <Pie  data={data3} />





const ChartJS = () => {
    return (
        <div>
            <LineChart />
			<BarChart />
			<PieChart />
        </div>
    );
};



export default ChartJS;
