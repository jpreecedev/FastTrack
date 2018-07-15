import React from 'react'
import { Bar } from 'react-chartjs-2'

var defaultStyling = {
  label: 'Duration of last fast',
  backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(255,99,132,1)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  hoverBorderColor: 'rgba(255,99,132,1)'
}

var getDataWithDefaultOptions = function getDataWithDefaultOptions(dataset) {
  return {
    labels: dataset.labels,
    datasets: [
      {
        ...defaultStyling,
        data: dataset.data
      }
    ]
  }
}

const Chart = ({ dataset, options }) => {
  if (!dataset?.data) {
    return null
  }

  return (
    <Bar
      data={getDataWithDefaultOptions(dataset)}
      height={250}
      options={{
        maintainAspectRatio: true
      }}
    />
  )
}

export default Chart
