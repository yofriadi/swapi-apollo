const {
  toGlobalId,
  fromGlobalId,
  connectionFromArray,
  connectionResolver
} = require('../../relay')

module.exports = {
  Query: {
    person: (_, {id, personID}, {dataSources: {SWAPI}}) => {
      if (id !== undefined && id !== null) {
        const {type, id: globalId} = fromGlobalId(id)

        if (
          globalId === null ||
          globalId === undefined ||
          globalId === ''
        ) {
          throw new Error(`No valid ID extracted from ${id}`)
        }

        return SWAPI.getData(type, globalId)
      }

      if (personID !== undefined && personID !== null) {
        return SWAPI.getData('people', personID)
      }

      throw new Error('must provide id or personID')
    },
    allPeople: async (_, args, {dataSources: {SWAPI}}) => {
      const {objects, totalCount} = await SWAPI.getAllData('people')
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
    homeworld: ({homeworld}, _, {dataSources: {SWAPI}}) =>
      SWAPI.getData(homeworld.split('/')[4], homeworld.split('/')[5]),
    species: ({species}, _, {dataSources: {SWAPI}}) =>
      SWAPI.getData(species[0].split('/')[4], species[0].split('/')[5]),
    filmConnection: (obj, args, {dataSources}) =>
      connectionResolver('films', obj, args, dataSources),
    starshipConnection: (obj, args, {dataSources}) =>
      connectionResolver('starships', obj, args, dataSources),
    vehicleConnection: (obj, args, {dataSources}) =>
      connectionResolver('vehicles', obj, args, dataSources)
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
