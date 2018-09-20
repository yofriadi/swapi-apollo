const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  idType,
  createdType,
  editedType
} = commonFields()

module.exports = gql`
  "A single transport craft that does not have hyperdrive capability"
  type Vehicle {

    ${idType}
    ${createdType}
    ${editedType}

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
  }

  "An edge in a connection."
  type VehiclesEdge {
 
    "A cursor for use in pagination."
    cursor: String!

    "The item at the end of the edge."
    node: Vehicle
  }

  "A connection to a list of items."
  type VehiclesConnection {

    "A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing '5' as the argument to 'first', then fetch the total count so it could display '5 of 83', for example."
    totalCount: Int

    "Information to aid in pagination."
    pageInfo: PageInfo!

    "A list of edges."
    edges: [VehiclesEdge]

    "A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for '{ edges { node } }' when no edge data is needed, this field can be be used instead. Note that when clients like Relay need to fetch the 'cursor' field on the edge to enable efficient pagination, this shortcut cannot be used, and the full '{ edges { node } }' version should be used instead."
    vehicles: [Vehicle]
  }

  extend type Query {
    "Get one vehicle."
    vehicle(
      id: ID
      vehicleID: ID
    ): Vehicle

    "Get all vehicles."
    allVehicles(
      after: String
      first: Int
      before: String
      last: Int
    ): VehiclesConnection
  }
`
