import React from 'react'
import { Bar } from 'react-chartjs-2'

var getDefaultOptions = function getDefaultOptions(max) {
  return {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false,
        lineTension: 0
      }
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Time in hours'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Date started'
          }
        }
      ]
    },
    legend: {
      display: true,
      position: 'top',
      reverse: true
    }
  }
}

var getDataWithDefaultStyling = function getDataWithDefaultStyling(dataset) {
  return {
    labels: dataset.labels,
    datasets: [
      {
        label: 'Duration of last fast',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dataset.data.map(x => {
          var rounded = Math.round((x.duration / 60) * 100) / 100
          if (rounded >= 1) {
            return rounded
          } else {
            return 1
          }
        })
      }
    ]
  }
}

const Chart = ({ dataset, max = 5 * 24 }) => {
  if (dataset.data.length === 0) {
    return null
  }

  return (
    <Bar
      data={getDataWithDefaultStyling(dataset)}
      height={250}
      options={getDefaultOptions(max)}
    />
  )
}

export default Chart
