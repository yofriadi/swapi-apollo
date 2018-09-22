const {commonFields} = require('../../helpers')
const {
  connectionField,
  connectionDefinitions,
  queryDefinitions
} = require('../../relay')

const commonFieldsType = commonFields()

const conn = connectionField([
  ['PlanetResidents', 'resident'],
  ['PlanetFilms', 'film']
])

const connDefs = connectionDefinitions([
  ['Planets', 'planets', 'Planet'],
  ['PlanetResidents', 'residents', 'Person'],
  ['PlanetFilms', 'films', 'Film']
])

const {
  queryOnce,
  queryAll
} = queryDefinitions(
  'Planets',
  'planet',
  'Planet',
  'planetID: ID'
)

module.exports = `
  "A large mass, planet or planetoid in the Star Wars Universe, at the time of 0 ABY."
  type Planet {

    ${commonFieldsType}

    "The name of this planet."
    name: String

    "The diameter of this planet in kilometers."
    diameter: String  # Int before

    "The number of standard hours it takes for this planet to complete a single rotation on its axis."
    rotationPeriod: String  # Int before

    "The number of standard days it takes for this planet to complete a single orbit of its local star."
    orbitalPeriod: String  # Int before

    "A number denoting the gravity of this planet, where '1' is normal or 1 standard G. '2' is twice or 2 standard Gs. '0.5' is half or 0.5 standard Gs."
    gravity: String

    "The average population of sentient beings inhabiting this planet."
    population: String  # Float before

    "The climates of this planet."
    climates: [String]

    "The terrains of this planet."
    terrains: [String]

    "The percentage of the planet surface that is naturally occuring water or bodies of water."
    surfaceWater: String  # Float before

    ${conn}
  }

  ${connDefs}

  extend type Query {
    "Get one planet."
    ${queryOnce}

    "Get all planets."
    ${queryAll}
  }
`
