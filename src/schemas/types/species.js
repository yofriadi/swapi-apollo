const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  id,
  created,
  edited
} = commonFields()

module.exports = gql`
  "A type of person or character within the Star Wars Universe."
  type Species {

    ${id}

    ${created}

    ${edited}

    "The name of this species."
    name: String

    "The classification of this species, such as 'mammal' or 'reptile'."
    classification: String

    "The designation of this species, such as 'sentient'."
    designation: String

    "The average height of this species in centimeters."
    averageHeight: String  # Float before

    "The average lifespan of this species in years, null if unknown."
    averageLifespan: String  # Int before

    "Common eye colors for this species, null if this species does not typically have eyes."
    eyeColors: [String]

    "Common hair colors for this species, null if this species does not typically have hair."
    hairColors: [String]

    "Common skin colors for this species, null if this species does not typically have skin."
    skinColors: [String]

    "The language commonly spoken by this species."
    language: String

    "A planet that this species originates from."
    homeworld: Planet
  }

  "An edge in a connection."
  type SpeciesEdge {
 
    "A cursor for use in pagination."
    cursor: String!

    "The item at the end of the edge."
    node: Species
  }

  "A connection to a list of items."
  type SpeciesConnection {

    "A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing '5' as the argument to 'first', then fetch the total count so it could display '5 of 83', for example."
    totalCount: Int

    "Information to aid in pagination."
    pageInfo: PageInfo!

    "A list of edges."
    edges: [SpeciesEdge]

    "A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for '{ edges { node } }' when no edge data is needed, this field can be be used instead. Note that when clients like Relay need to fetch the 'cursor' field on the edge to enable efficient pagination, this shortcut cannot be used, and the full '{ edges { node } }' version should be used instead."
    species: [Species]
  }

  extend type Query {
    "Get on species."
    species(
      id: ID
      speciesID: ID
    ): Species

    "Get all species."
    allSpecies(
      after: String
      first: Int
      before: String
      last: Int
    ): SpeciesConnection
  }
`
