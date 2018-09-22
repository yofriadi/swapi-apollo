const {commonFields} = require('../../helpers')
const {
  connectionField,
  connectionDefinitions,
  queryDefinitions
} = require('../../relay')

const commonFieldsType = commonFields()

const conn = connectionField([
  ['FilmSpecies', 'species'],
  ['FilmStarships', 'starship'],
  ['FilmVehicles', 'vehicle'],
  ['FilmCharacters', 'character'],
  ['FilmPlanets', 'planet']
])

const connDefs = connectionDefinitions([
  ['Films', 'films', 'Film'],
  ['FilmSpecies', 'species', 'Species'],
  ['FilmStarships', 'starships', 'Starship'],
  ['FilmVehicles', 'vehicles', 'Vehicle'],
  ['FilmCharacters', 'characters', 'Person'],
  ['FilmPlanets', 'planets', 'Planet']
])

const {
  queryOnce,
  queryAll
} = queryDefinitions(
  'Films',
  'film',
  'Film',
  'filmID: ID'
)

module.exports = `
  "A single film."
  type Film {

    ${commonFieldsType}

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

    ${conn}
  }

  ${connDefs}

  type Query {
    "Get one Film."
    ${queryOnce}

    "Get all Films."
    ${queryAll}
  }
`
