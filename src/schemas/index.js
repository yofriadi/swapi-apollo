const {join} = require('path')
const {makeExecutableSchema, gql} = require('apollo-server')
const {fileLoader} = require('merge-graphql-schemas')
const {merge} = require('lodash')

const {nodeType} = require('./types')
const nodeResolver = require('./resolvers')

const types = fileLoader(join(__dirname, './types'))
const resolvers = fileLoader(join(__dirname, './resolvers'))
const type = `
  schema {
    query: Query
  }
`
const resolver = {}

module.exports = makeExecutableSchema({
  typeDefs: [type, ...types, nodeType],
  resolvers: merge(resolver, ...resolvers, nodeResolver)
})
