import { ApolloServer, gql } from 'apollo-server'

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      helloWorld: String!
    }
  `,
  resolvers: {
    Query: {
      helloWorld: () => {
        return 'Hello World'
      }
    }
  }
})

server
  .listen()
  .then(({ url }) => {
    console.log('running: ', url)
  })