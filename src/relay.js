const {getObjectFromTypeAndId} = require('./helpers')
const {nodeDefinitions, fromGlobalId} = require('graphql-relay')

const {
  FilmType,
  PersonType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType
} = require('./schemas/types')

const swapiTypeToGraphQLType = swapiType => {
  switch(swapiType) {
    case 'films': return FilmType
    case 'people': return PersonType
    case 'planets': return PlanetType
    case 'species': return SpeciesType
    case 'starships': return StarshipType
    case 'vehicles': return VehicleType
    default: throw new Error(`Unrecognized type '${swapiType}'.`)
  }
}

exports.idFetcher = globalId => {
  const {type, id} = fromGlobalId(globalId)
  return getObjectFromTypeAndId(type, id)
}

exports.typeResolver = obj => {
  const parts = obj.url.split('/')
  return swapiTypeToGraphQLType(parts[parts.length - 3])
}
