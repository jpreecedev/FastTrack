const typeDefs = `
type Query {
  hello(name: String): String!
}
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
}

export default { typeDefs, resolvers }
