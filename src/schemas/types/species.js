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
    averageHeight: Float

    "The average lifespan of this species in years, null if unknown."
    averageLifespan: Int

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

  extend type Query {
    species(
      id: ID
      speciesID: ID
    ): Species
  }
`
