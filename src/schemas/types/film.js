const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  id,
  created,
  edited
} = commonFields()

module.exports = gql`
  "A single film."
  type Film {

    ${id}

    ${created}

    ${edited}

    "The title of this film."
    title: String

    "The episode number of this film."
    episodeID: Int

    "The opening paragraphs at the beginning of this film."
    openingCrawl: String

    "The name of the director of this film."
    director: String

    "The name(s) of the producer(s) of this film."
    producers: [String]

    "The ISO 8601 date format of film release at original creator country."
    releaseDate: String

    speciesConnection(
      after: String
      first: Int
      before: String
      last: Int
    ): FilmSpeciesConnection
  }

  "An edge in a connection."
  type FilmsEdge {
 
    "A cursor for use in pagination."
    cursor: String!

    "The item at the end of the edge."
    node: Film
  }

  type FilmSpeciesEdge {
    node: Species
    cursor: String!
  }

  "A connection to a list of items."
  type FilmsConnection {

    "A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing '5' as the argument to 'first', then fetch the total count so it could display '5 of 83', for example."
    totalCount: Int

    "Information to aid in pagination."
    pageInfo: PageInfo!

    "A list of edges."
    edges: [FilmsEdge]

    "A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for '{ edges { node } }' when no edge data is needed, this field can be be used instead. Note that when clients like Relay need to fetch the 'cursor' field on the edge to enable efficient pagination, this shortcut cannot be used, and the full '{ edges { node } }' version should be used instead."
    films: [Film]
  }

  type FilmSpeciesConnection {
    totalCount: Int
    pageInfo: PageInfo!
    edges: [FilmSpeciesEdge]
    species: [Species]
  }

  type Query {
    "Get one Film."
    film(
      id: ID
      filmID: ID
    ): Film

    "Get all Films."
    allFilms(
      after: String
      first: Int
      before: String
      last: Int
    ): FilmsConnection
  }
`
