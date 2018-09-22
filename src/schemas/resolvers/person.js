const {
  getObjectFromTypeAndId,
  getObjectFromUrl,
  getObjectsByType
} = require('../../helpers')
const {
  toGlobalId,
  fromGlobalId,
  connectionResolver
} = require('../../relay')

module.exports = {
  Query: {
    person: (_, {id, personID}) => {
      if (id !== undefined && id !== null) {
        const {type, id: globalId} = fromGlobalId(id)

        if (
          globalId === null ||
          globalId === undefined ||
          globalId === ''
        ) {
          throw new Error(`No valid ID extracted from ${id}`)
        }

        return getObjectFromTypeAndId(type, globalId)
      }

      if (personID !== undefined && personID !== null) {
        return getObjectFromTypeAndId('people', personID)
      }

      throw new Error('must provide id or personID')
    },
    allPeople: async (_, args) => {
      const {objects, totalCount} = await getObjectsByType('people')
      return {
        totalCount,
        ...connectionFromArray(objects, args)
      }
    }
  },
  Person: {
    id: ({id}) => toGlobalId('people', id),
    birthYear: ({birth_year}) => birth_year,
    eyeColor: ({eye_color}) => eye_color,
    hairColor: ({hair_color}) => hair_color,
    skinColor: ({skin_color}) => skin_color,
    homeworld: ({homeworld}) => getObjectFromUrl(homeworld),
    species: ({species}) => getObjectFromUrl(species),
    filmConnection: (obj, args) => connectionResolver('films', obj, args),
    starshipConnection: (obj, args) => connectionResolver('starships', obj, args),
    vehicleConnection: (obj, args) => connectionResolver('vehicles', obj, args)
  },
  PeopleConnection: {
    people: conn => conn.edges.map(edge => edge.node)
  },
  PersonFilmsConnection: {
    films: conn => conn.edges.map(edge => edge.node)
  },
  PersonStarshipsConnection: {
    starships: conn => conn.edges.map(edge => edge.node)
  },
  PersonVehiclesConnection: {
    vehicles: conn => conn.edges.map(edge => edge.node)
  }
}
