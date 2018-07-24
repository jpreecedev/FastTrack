import { toChartDataFormat } from '../../src/database'

describe('Database wrapper tests', () => {
  describe('toChartDataFormat tests', () => {
    test('should add the fasting data to the existing dataset', () => {
      const fastingData = {
        label: 'FAKE LABEL'
      }
      const dataset = {
        labels: [],
        data: []
      }

      const updatedDataset = toChartDataFormat(fastingData, dataset)

      expect(updatedDataset.labels).toHaveLength(1)
      expect(updatedDataset.data).toHaveLength(1)

      expect(updatedDataset.labels[0]).toEqual(fastingData.label)
      expect(updatedDataset.data[0]).toEqual(fastingData)
    })

    test('should update the existing data when the label already exists', () => {
      const label = 'FAKE LABEL'

      const fastingData = {
        label,
        duration: 999,
        started: 'STARTED',
        stopped: 'STOPPED'
      }
      const dataset = {
        labels: [label],
        data: [
          {
            label
          }
        ]
      }

      const updatedDataset = toChartDataFormat(fastingData, dataset)

      expect(updatedDataset.labels).toHaveLength(1)
      expect(updatedDataset.data).toHaveLength(1)

      expect(updatedDataset.data[0].duration).toBe(fastingData.duration)
      expect(updatedDataset.data[0].started).toBe(fastingData.started)
      expect(updatedDataset.data[0].stopped).toBe(fastingData.stopped)
    })

    test('should return the original dataset when fasting data is not provided', () => {
      const fastingData = null
      const dataset = {
        data: []
      }

      const updatedDataset = toChartDataFormat(fastingData, dataset)

      expect(updatedDataset).toEqual(dataset)
    })

    test('should throw an error when dataset is undefined', () => {
      const fastingData = {}
      const dataset = null

      expect(() => {
        toChartDataFormat(fastingData, dataset)
      }).toThrowError('Dataset is required')
    })
  })
})
