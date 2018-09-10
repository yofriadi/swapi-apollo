const {gql} = require('apollo-server')

module.exports = gql`
  "A large mass, planet or planetoid in the Star Wars Universe, at the time of 0 ABY."
  type Planet {

    "The name of this planet."
    name: String

    "The diameter of this planet in kilometers."
    diameter: Int

    "The number of standard hours it takes for this planet to complete a single rotation on its axis."
    rotationPeriod: Int

    "The number of standard days it takes for this planet to complete a single orbit of its local star."
    orbitalPeriod: Int

    "A number denoting the gravity of this planet, where '1' is normal or 1 standard G. '2' is twice or 2 standard Gs. '0.5' is half or 0.5 standard Gs."
    gravity: String

    "The average population of sentient beings inhabiting this planet."
    population: Float

    "The climates of this planet."
    climates: [String]

    "The terrains of this planet."
    terrains: [String]

    "The percentage of the planet surface that is naturally occuring water or bodies of water."
    surfaceWater: Float
  }

  extend type Query {
    planet(
      id: ID
      planetID: ID
    ): Planet
  }
`
