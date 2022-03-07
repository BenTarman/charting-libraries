import React from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const series = [
    {
        name: "violations",
        data: [
            10000, 12038, 9999, 8369,
        ],
    },
];
const options = {
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        type: "datetime",
        min: new Date("1/22/20").getTime(),
        categories: [
            "1/22/20",
            "2/1/20",
            "2/15/20",
            "3/1/20",
        ],
    },
    tooltip: {
        x: {
            format: "dd/MM/yy",
        },
    },
};

const AreaChart = () => (
    <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
    />
);

const series2 = [
    {
        data: [21, 22, 10],
    },
];

const options2 = {
    chart: {
        height: 350,
        type: "bar",
        events: {
            click: function (chart, w, e) {
                // console.log(chart, w, e)
            },
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "45%",
            distributed: true,
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    xaxis: {
        categories: [
            ["US Driving", "Liscense"],
            ["US", "Passport"],
            ["Date", "of Brith"],
        ],
        labels: {
            style: {
                fontSize: "12px",
            },
        },
    },
};

const BarChart = () => (
    <ReactApexChart options={options2} series={series2} type="bar" height={350} width={450} />
);





const series3 = [44, 55, 13, 24];
const options3 = {
	chart: {
	width: 380,
	type: 'pie',
	},
	labels: ['Policy A', 'Policy B', 'Policy C', 'Policy D'],
	colors:['#5E15D4', '#1A105A', '#885BD0', '#AE95D7'],
	responsive: [{
	options: {
		chart: {
		width: 200
		},
		legend: {
		position: 'bottom'
		}
	}
	}]
};


const PieChart = () => (
    <ReactApexChart options={options3} series={series3} type="pie" height={350} width={450} />
);




const Apex = () => {
    return (
        <div>
			<AreaChart />
            <BarChart />
			<PieChart />
        </div>
    );
};

export default Apex;
