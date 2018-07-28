import express from 'express'
import { json, urlencoded } from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { createRoutes } from './routes'
import cors from 'cors'
import schema from './schema'

const app = express()
const server = new ApolloServer(schema)

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

server.applyMiddleware({ app })
createRoutes(app)

app.set('port', process.env.PORT || 3002)
app.listen(app.get('port'))

export default app
