const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  id,
  created,
  edited
} = commonFields()

module.exports = gql`
  "A single transport craft that has hyperdrive capability."
  type Starship {

    ${id}

    ${created}

    ${edited}

    "The name of this starship. The common name, such as 'Death Star'."
    name: String

    "The model or official name of this starship. Such as 'T-65 X-wing' or 'DS-1 Orbital Battle Station'."
    model: String

    "The class of this starship, such as 'Starfighter' or 'Deep Space Mobile Battlestation'"
    starshipClass: String

    "The manufacturers of this starship."
    manufacturers: [String]

    "The cost of this starship new, in galactic credits."
    costInCredits: Float

    "The length of this starship in meters."
    length: Float

    "The number of personnel needed to run or pilot this starship."
    crew: String

    "The number of non-essential people this starship can transport."
    passengers: String

    "The maximum speed of this starship in atmosphere. null if this starship is incapable of atmosphering flight."
    maxAtmospheringSpeed: Int

    "The class of this starships hyperdrive."
    hyperdriveRating: Float

    "The Maximum number of Megalights this starship can travel in a standard hour. A 'Megalight' is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth."
    MGLT: Int

    "The maximum number of kilograms that this starship can transport."
    cargoCapacity: Float

    "The maximum length of time that this starship can provide consumables for it's entire crew without having to resupply."
    consumables: String
  }

  extend type Query {
    starship(
      id: ID
      starshipID: ID
    ): Starship
  }
`
