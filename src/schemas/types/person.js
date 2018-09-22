const {commonFields} = require('../../helpers')
const {
  connectionField,
  connectionDefinitions,
  queryDefinitions
} = require('../../relay')

const commonFieldsType = commonFields()

const conn = connectionField([
  ['PersonFilms', 'film'],
  ['PersonStarships', 'starship'],
  ['PersonVehicles', 'vehicle']
])

const connDefs = connectionDefinitions([
  ['People', 'people', 'Person'],
  ['PersonFilms', 'films', 'Film'],
  ['PersonStarships', 'starships', 'Starship'],
  ['PersonVehicles', 'vehicles', 'Vehicle']
])

const {
  queryOnce,
  queryAll
} = queryDefinitions(
  'People',
  'person',
  'Person',
  'personID: ID'
)

module.exports = `
  "An individual person or character within the Star Wars universe."
  type Person {

    ${commonFieldsType}

    "The name of this person."
    name: String

    "The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope."
    birthYear: String

    "The eye color of this person. Will be 'unknown' if not known or 'n/a' if the person does not have an eye."
    eyeColor: String

    "The gender of this person. Either 'Male', 'Female' or 'unknown', 'n/a' if the person does not have a gender."
    gender: String

    "The hair color of this person. Will be 'unknown' if not known or 'n/a' if the person does not have hair."
    hairColor: String

    "The height of the person in centimeters."
    height: String  # Int before

    "The mass of the person in kilograms."
    mass: String  # Float before

    "The skin color of this person."
    skinColor: String

    "A planet that this person was born on or inhabits."
    homeworld: Planet

    "The species that this person belongs to or unknown."
    species: Species

    ${conn}
  }

  ${connDefs}

  extend type Query {
    "Get one person."
    ${queryOnce}

    "Get all people."
    ${queryAll}
  }
`
