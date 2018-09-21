const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')
const {
  connectionArgs,
  connectionDefinitions,
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
} = connectionDefinitions(
  'Films',
  'films',
  'Film'
)
const {
  connectionField: connectionFieldSpecies,
  edgeType: edgeSpeciesType,
  connectionType: connectionSpeciesType
} = connectionDefinitions(
  'FilmSpecies',
  'species',
  'Species'
)
const {
  connectionField: connectionFieldStarship,
  edgeType: edgeStarshipsType,
  connectionType: connectionStarshipsType
} = connectionDefinitions(
  'FilmStarships',
  'starships',
  'Starship',
  'starship'
)
const {
  connectionField: connectionFieldVehicle,
  edgeType: edgeVehiclesType,
  connectionType: connectionVehiclesType
} = connectionDefinitions(
  'FilmVehicles',
  'vehicles',
  'Vehicle',
  'vehicle'
)
const {
  connectionField: connectionFieldCharacter,
  edgeType: edgeCharactersType,
  connectionType: connectionCharactersType
} = connectionDefinitions(
  'FilmCharacters',
  'characters',
  'Person',  // type def
  'character'
)
const {
  connectionField: connectionFieldPlanet,
  edgeType: edgePlanetsType,
  connectionType: connectionPlanetsType
} = connectionDefinitions(
  'FilmPlanets',
  'planets',
  'Planet',  // type def
  'planet'
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

    "Connection of Film and Species."
    ${connectionFieldSpecies}

    "Connection of Film and Starships."
    ${connectionFieldStarship}

    "Connection of Film and Vehicles"
    ${connectionFieldVehicle}

    "Connection of Film and Characters"
    ${connectionFieldCharacter}

    "Connection of Film and Planets"
    ${connectionFieldPlanet}
  }

  # Root connection type
  ${edgeFilmsType}
  ${connectionFilmsType}

  # Connection type
  ${edgeSpeciesType}
  ${connectionSpeciesType}
  ${edgeStarshipsType}
  ${connectionStarshipsType}
  ${edgeVehiclesType}
  ${connectionVehiclesType}
  ${edgeCharactersType}
  ${connectionCharactersType}
  ${edgePlanetsType}
  ${connectionPlanetsType}

  type Query {
    "Get one Film."
    ${queryOnce}

    "Get all Films."
    ${queryAll}
  }
`
