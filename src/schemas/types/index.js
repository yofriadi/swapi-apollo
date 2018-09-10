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

module.exports = {
  FilmType,
  PersonType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType,
  nodeType
}
