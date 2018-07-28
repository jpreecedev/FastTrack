import testController from '../controllers/test'

export function createRoutes(app) {
  app.get('/api/test', testController.get)
}
