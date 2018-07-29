import React from 'react'
import { Bar } from 'react-chartjs-2'

import { getFastDuration, DefaultDisplayDateFormat } from '../../database'
import moment from 'moment-es6'

function padDataset(records) {
  var result = records

  if (records.length < 7) {
    return records
  }

  for (var i = records.length; i < 7; i++) {
    result.unshift({})
  }

  return result
}

function getLabels(records) {
  var result = []

  if (records.length < 7) {
    return records.map(record => moment(record.started).format(DefaultDisplayDateFormat))
  }

  for (var record in records) {
    var started = moment(record.started).format(DefaultDisplayDateFormat)
    if (!result.includes(started)) {
      result.push(started)
    }
    if (result.length === 6) {
      break
    }
  }

  for (var i = result.length; i < 7; i++) {
    result.unshift(
      moment()
        .subtract(i, 'days')
        .format(DefaultDisplayDateFormat)
    )
  }

  return result
}

function getDefaultOptions(max) {
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

function getDataWithDefaultStyling(dataset) {
  var labels = getLabels(dataset.records)
  var paddedRecords = padDataset(dataset.records)

  return {
    labels,
    datasets: [
      {
        label: 'Duration of fast',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: paddedRecords.map(x => {
          var unrounded = getFastDuration(x.started, x.stopped) / 60
          if (unrounded > 0 && unrounded < 1) {
            return 1
          }
          return Math.round(unrounded)
        })
      }
    ]
  }
}

const Chart = ({ dataset, max = 1 * 24 }) => {
  if (dataset.records.length === 0) {
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
