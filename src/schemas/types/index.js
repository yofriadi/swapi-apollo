const {gql} = require('apollo-server')

const FilmType = require('./film')
const PersonType = require('./person')
const PlanetType = require('./planet')
const SpeciesType = require('./species')
const StarshipType = require('./starship')
const VehicleType = require('./vehicle')

const nodeType = gql`
  "An object with an ID"
  interface Node {

    "The id of the object"
    id: ID!
  }

  extend type Query {

    "Fetches an object given it's ID"
    node(id: ID!): Node
  }
`

const sharedSchema = gql`
  "Information about pagination in a connection."
  type PageInfo {
    
    "When pagination forwards, are there more items ?"
    hasNextPage: Boolean!

    "When pagination backwards, are there more items ?"
    hasPreviousPage: Boolean!

    "When paginating backwards, the cursor to continue."
    startCursor: String

    "When paginating forwards, the cursor to continue."
    endCursor: String
  }
`

module.exports = {
  FilmType,
  PersonType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType,
  nodeType,
  sharedSchema
}
