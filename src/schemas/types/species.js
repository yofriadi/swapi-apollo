const {commonFields} = require('../../helpers')
const {
  connectionField,
  connectionDefinitions,
  queryDefinitions
} = require('../../relay')

const commonFieldsType = commonFields()

const conn = connectionField([
  ['SpeciesPeople', 'person'],
  ['SpeciesFilms', 'film']
])

const connDefs = connectionDefinitions([
  ['Species', 'species', 'Species'],
  ['SpeciesPeople', 'people', 'Person'],
  ['SpeciesFilms', 'films', 'Film']
])

const {
  queryOnce,
  queryAll
} = queryDefinitions(
  'Species',
  'species',
  'Species',
  'speciesID: ID'
)

module.exports = `
  "A type of person or character within the Star Wars Universe."
  type Species {

    ${commonFieldsType}

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

    ${conn}
  }

  ${connDefs}

  extend type Query {
    "Get on species."
    ${queryOnce}

    "Get all species."
    ${queryAll}
  }
`
