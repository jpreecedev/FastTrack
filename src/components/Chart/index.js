import React from 'react'
import { Bar } from 'react-chartjs-2'

const Chart = ({ data, options }) => (
  <Bar
    data={data}
    height={250}
    options={{
      maintainAspectRatio: true
    }}
  />
)

export default Chart
