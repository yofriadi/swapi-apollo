const {getObjectFromTypeAndId} = require('./helpers')

const {
  FilmType,
  PersonType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType
} = require('./schemas/types')

/**
 * Given type name, return graphql type
 */
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

/**
 * Given id:type return global id
 *
 * @param {string} i Semicolon separated value of id & type
 * @returns {string} id Global id
 */
const base64 = str => Buffer.from(str, 'utf8').toString('base64')

/**
 * Given global id return id:type
 *
 * @param {string} globalId Global id
 * @returns {string} i Semicolon separated value of id & type 
 */
const unbase64 = globalId => Buffer.from(globalId, 'base64').toString('utf8')

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

const connectionFromArray = (data, args) => connectionFromArraySlice(
  data,
  args,
  {
    sliceStart: 0,
    arrayLength: data.length
  }
)

const connectionFromArraySlice = (array, args, meta) => {
  const {after, first, before, last} = args
  const {sliceStart, arrayLength} = meta
  const sliceEnd = sliceStart + array.length
  const beforeOffset = getOffsetWithDefault(before, arrayLength)
  const afterOffset = getOffsetWithDefault(after, -1)
  let startOffset = Math.max(
    sliceStart - 1,
    afterOffset,
    -1
  ) + 1
  let endOffset = Math.min(
    sliceEnd,
    beforeOffset,
    arrayLength
  )

  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error('Argument "first" must be a non-negative number')
    }
    endOffset = Math.min(
      endOffset,
      startOffset + first
    )
  }

  if (typeof last === 'number') {
    if (last < 0) {
      throw new error('Argument "last" must be a non-negative number')
    }
    startOffset = Math.max(
      startOffset,
      endOffset - last
    )
  }

  /**
   * If supplied array is too large, trim it down before mapping over it.
   */
  const slice = array.slice(
    Math.max(startOffset - sliceStart, 0),
    array.length - (sliceEnd - endOffset)
  )
  const edges = slice.map((value, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: value
  }))
  const firstEdge = edges[0]
  const lastEdge = edges[edges.length - 1]
  const lowerBound = after ? (afterOffset + 1) : 0
  const upperBound = before ? beforeOffset : arrayLength
  return {
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage: typeof last === 'number' ? startOffset > lowerBound : false,
      hasNextPage: typeof first === 'number' ? endOffset < upperBound : false
    }
  }
}

const getOffsetWithDefault = (cursor, defaultOffset) => {
  if (typeof cursor !== 'string') {
    return defaultOffset
  }
  const offset = cursorToOffset(cursor)
  return isNaN(offset) ? defaultOffset : offset
}

const cursorToOffset = cursor => parseInt(unbase64(cursor).substring(PREFIX.length), 10)

const offsetToCursor = offset => base64(PREFIX + offset)

const PREFIX = 'arrayconnection'

module.exports = {
  swapiTypeToGraphQLType,
  toGlobalId,
  fromGlobalId,
  idFetcher,
  typeResolver,
  connectionFromArray
}
