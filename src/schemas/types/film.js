const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')
const {
  connectionArgs,
  connectionDefinitions,
  rootConnectionDefinitions,
  queryDefinitions
} = require('../../relay')

const {
  idType,
  createdType,
  editedType
} = commonFields()
const {
  edgeType: edgeFilmsType,
  connectionType: connectionFilmsType
} = rootConnectionDefinitions(
  'Films',
  'films'
)
const {
  connectionField: connectionFieldSpecies,
  edgeType: edgeSpeciesType,
  connectionType: connectionSpeciesType
} = connectionDefinitions(
  'FilmSpecies',
  'species'
)
const {
  queryOnce,
  queryAll
} = queryDefinitions(
  'Films',
  'film',
  'filmID: ID'
)

module.exports = gql`
  "A single film."
  type Film {

    ${idType}
    ${createdType}
    ${editedType}

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

    ${connectionFieldSpecies}
  }

  ${edgeFilmsType}
  ${connectionFilmsType}
  ${edgeSpeciesType}
  ${connectionSpeciesType}

  type Query {
    ${queryOnce}
    ${queryAll}
  }
`
