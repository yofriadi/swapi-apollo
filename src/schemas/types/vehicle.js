const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  id,
  created,
  edited
} = commonFields()

module.exports = gql`
  "A single transport craft that does not have hyperdrive capability"
  type Vehicle {

    ${id}

    ${created}

    ${edited}

    "The name of this vehicle. The common name, such as 'Sand Crawler' or 'Speeder bike'."
    name: String

    "The model or official name of this vehicle. Such as 'All-Terrain Attack Transport'."
    model: String

    "The class of this vehicle, such as 'Wheeled' or 'Repulsorcraft'."
    vehicleClass: String

    "The manufacturers of this vehicle."
    manufacturers: [String]

    "The cost of this vehicle new, in Galactic Credits."
    costInCredits: Float

    "The length of this vehicle in meters."
    length: Float

    "The number of personnel needed to run or pilot this vehicle."
    crew: String

    "The number of non-essential people this vehicle can transport."
    passengers: String

    "The maximum speed of this vehicle in atmosphere."
    maxAtmospheringSpeed: Int

    "The maximum number of kilograms that this vehicle can transport."
    cargoCapacity: Float

    "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply."
    consumables: String
  }

  extend type Query {
    vehicle(
      id: ID
      vehicleID: ID
    ): Vehicle
  }
`
