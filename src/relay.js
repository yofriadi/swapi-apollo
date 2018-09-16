const {getObjectFromTypeAndId} = require('./helpers')

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

const base64 = i => Buffer.from(i, 'utf8').toString('base64')
const unbase64 = i => Buffer.from(i, 'base64').toString('utf8')

const toGlobalId = (type, id) => base64([type, id].join(':'))

const fromGlobalId = globalId => {
  const unbasedGlobalId = unbase64(globalId)
  const delimiterPos = unbasedGlobalId.indexOf(':')
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1)
  }
}

const idFetcher = globalId => {
  const {type, id} = fromGlobalId(globalId)
  return getObjectFromTypeAndId(type, id)
}

const typeResolver = obj => {
  const parts = obj.url.split('/')
  return swapiTypeToGraphQLType(parts[parts.length - 3])
}

module.exports = {
  swapiTypeToGraphQLType,
  toGlobalId,
  fromGlobalId,
  idFetcher,
  typeResolver
}
