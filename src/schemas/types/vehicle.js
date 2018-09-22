const {commonFields} = require('../../helpers')
const {
  connectionField,
  connectionDefinitions,
  queryDefinitions
} = require('../../relay')

const commonFieldsType = commonFields()

const conn = connectionField([
  ['VehiclePilots', 'pilot'],
  ['VehicleFilms', 'film']
])

const connDefs = connectionDefinitions([
  ['Vehicles', 'vehicles', 'Vehicle'],
  ['VehiclePilots', 'pilots', 'Person'],
  ['VehicleFilms', 'films', 'Film']
])

const {
  queryOnce,
  queryAll
} = queryDefinitions(
  'Vehicles',
  'vehicle',
  'Vehicle',
  'vehicleID: ID'
)

module.exports = `
  "A single transport craft that does not have hyperdrive capability"
  type Vehicle {

    ${commonFieldsType}

    "The name of this vehicle. The common name, such as 'Sand Crawler' or 'Speeder bike'."
    name: String

    "The model or official name of this vehicle. Such as 'All-Terrain Attack Transport'."
    model: String

    "The class of this vehicle, such as 'Wheeled' or 'Repulsorcraft'."
    vehicleClass: String

    "The manufacturers of this vehicle."
    manufacturers: [String]

    "The cost of this vehicle new, in Galactic Credits."
    costInCredits: String  # Float before

    "The length of this vehicle in meters."
    length: String  # Float before

    "The number of personnel needed to run or pilot this vehicle."
    crew: String

    "The number of non-essential people this vehicle can transport."
    passengers: String

    "The maximum speed of this vehicle in atmosphere."
    maxAtmospheringSpeed: String  # Int before

    "The maximum number of kilograms that this vehicle can transport."
    cargoCapacity: String  # Float before

    "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply."
    consumables: String

    ${conn}
  }

  ${connDefs}

  extend type Query {
    "Get one vehicle."
    ${queryOnce}

    "Get all vehicles."
    ${queryAll}
  }
`
