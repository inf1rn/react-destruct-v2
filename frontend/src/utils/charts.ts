import { IInfographicsData } from './../types/infographics.d';
import _ from "lodash"
import { IDynamicInfographicsData } from "../types/infographics"

import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

interface IBarChartData {
    labels: Array<string>
    datasets: [{
        label: string
        data: Array<number>,
        barThickness: number,
        backgroundColor: Array<string>,
    }]
}

interface IBarChartConfig {
    data: IBarChartData
    options: any
}


interface IDoughnutChartData {
    labels: Array<string>
    datasets: [{
        label: string
        data: Array<number>,
        backgroundColor: Array<string>,
        hoverBackgroundColor: Array<string>,
        borderColor: string,
        borderWidth: number
    }]
}

interface IDoughnutChartConfig {
    data: IDoughnutChartData
    options: any
}

const randomRGBNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

const randomRGBA = () => `rgba(${randomRGBNum()}, ${randomRGBNum()}, ${randomRGBNum()}, 0.5)`;

export const getBarChartConfig = (labels: Array<string>, data: Array<number>, title: string): IBarChartConfig => {
    const maxValue = _.max(data)
    console.log(maxValue)
    
    const dataChart: IBarChartData = {
        labels,
        datasets: [{
            data,
            label: title,
            barThickness: 18,
            backgroundColor: new Array(labels.length).fill(null).map(() => randomRGBA())
        }]
    }
    const optionsChart = {
        plugins: {
            legend: false,
        },
        grid: {
            borderColor: "#8798AD",
        },
        maintainAspectRatio: false,
        barPercentage: 0.61,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 99,
                grid: {
                    borderColor: "#dedede",
                    color: "#dedede",
                    borderDash: [6, 3],
                    borderWidth: 0.5,
                    tickLength: 1,
                    tickColor: "rgba(0,0,0,0)",
                },
                ticks: {
                    display: false,
                    stepSize: maxValue && maxValue / 5 > 10 ? maxValue / 5 : 10,
                },
            },
            x: {
                grid: {
                    borderColor: "#dedede",
                    tickColor: "rgba(0,0,0,0)",
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0.5,
                    tickLength: 6,
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    padding: 0,
                },
            },
        },
        onResize: function (chart: any) {
            chart.update();
        },
    }

    return {
        data: dataChart,
        options: optionsChart
    }
}

export const getLineChartConfig = (labels: Array<String>, datasets: { [key in string]: number }, title: string) => {
    const maxValue = _.max(Object.values(datasets))

    const dataChart = {
        labels,
        datasets: Object.keys(datasets).map(dataset => {
            const color = randomRGBA()

            return ({
                data: datasets[dataset],
                borderColor: color,
                backgroundColor: color,
                fill: true,
                label: dataset,
                lineTension: 0.2,
                pointRadius: 2,
                borderWidth: 0.5,
            })
        })
    }

    const optionsChart = {
        grid: {
            borderColor: "#8798AD",
        },
        legend: {
            display: false,
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 99,
                grid: {
                    borderColor: "#dedede",
                    color: "#dedede",
                    borderDash: [6, 3],
                    borderWidth: 0.5,
                    tickLength: 1,
                    tickColor: "rgba(0,0,0,0)",
                },
                ticks: {
                    display: false,
                    stepSize: maxValue ? maxValue / 5 : 10,
                },
            },
            x: {
                grid: {
                    borderColor: "#dedede",
                    tickColor: "rgba(0,0,0,0)",
                    color: "rgba(0,0,0,0)",
                    borderWidth: 2,
                    tickLength: 6,
                },
                ticks: {
                    font: {
                        size: 13,
                    },
                    padding: 0,
                },
            },
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }


    return {
        data: dataChart,
        options: optionsChart
    }
}

export const getLineChartData = (data: Array<IInfographicsData>): IDynamicInfographicsData => {
    const subcultures: Array<string> = Object.keys(data[0].hash)

    const datasets: any = {}

    subcultures.forEach((subculture) => {
        const subculturesStatistics = data.map((dataItem) => {
            const subcultureStatistics = dataItem.hash[subculture]
            return subcultureStatistics ? subcultureStatistics : 0
        })

        datasets[subculture] = subculturesStatistics
    })

    const labels = data.map(dataItem => new Date(dataItem.date).toLocaleDateString("ru-RU").slice(0, 10))
    return {
        datasets,
        labels
    }
}

export const getDoughnutChartConfig = (labels: Array<string>, data: Array<number>, title: string): IDoughnutChartConfig => {
    return {
        data: {
            labels: labels,
            datasets: [
                {
                    label: "",
                    backgroundColor:
                        new Array(labels.length).fill(null).map(() => randomRGBA())
                    ,
                    hoverBackgroundColor:
                        new Array(labels.length).fill(null).map(() => randomRGBA())
                    ,
                    borderColor: "#f2f1f3",
                    borderWidth: 1,
                    data,
                },
            ],
        },
        options: {
            plugins: {
                legend: false,
            },
            rotation: 49,
            maintainAspectRatio: false,
            cutout: 99,
        },
    };

}