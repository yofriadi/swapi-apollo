const {commonFields} = require('../../helpers')
const {
  connectionField,
  connectionDefinitions,
  queryDefinitions
} = require('../../relay')

const {
  idType,
  createdType,
  editedType
} = commonFields()

const [
  speciesConn,
  starshipConn,
  vehicleConn,
  characterConn,
  planetConn
] = connectionField([
  ['FilmSpecies', 'species'],
  ['FilmStarships', 'starship'],
  ['FilmVehicles', 'vehicle'],
  ['FilmCharacters', 'character'],
  ['FilmPlanets', 'planet']
])

const [
  filmsConn,
  filmSpeciesConn,
  filmStarshipsConn,
  filmVehiclesConn,
  filmCharactersConn,
  filmPlanetsConn
] = connectionDefinitions([
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
  'filmID: ID'
)

module.exports = `
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

    "Connection of Film and Species."
    ${speciesConn}

    "Connection of Film and Starships."
    ${starshipConn}

    "Connection of Film and Vehicles."
    ${vehicleConn}

    "Connection of Film and Characters."
    ${characterConn}

    "Connection of Film and Planets."
    ${planetConn}
  }

  ${filmsConn}
  ${filmSpeciesConn}
  ${filmStarshipsConn}
  ${filmVehiclesConn}
  ${filmCharactersConn}
  ${filmPlanetsConn}

  type Query {
    "Get one Film."
    ${queryOnce}

    "Get all Films."
    ${queryAll}
  }
`
