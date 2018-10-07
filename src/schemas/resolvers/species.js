const {
  arrayList
} = require('../../helpers')
const {
  toGlobalId,
  fromGlobalId,
  connectionFromArray,
  connectionResolver
} = require('../../relay')

module.exports = {
  Query: {
    species: (_, {id, speciesID}, {dataSources: {SWAPI}}) => {
      if (id !== undefined && id !== null) {
        const {type, id: globalId} = fromGlobalId(id);

        if (
          globalId === null ||
          globalId === undefined ||
          globalId === ''
        ) {
          throw new Error(`No valid ID extracted from ${id}`)
        }
        return SWAPI.getData(type, globalId)
      }

      if (speciesID !== undefined && speciesID !== null) {
        return SWAPI.getData('species', speciesID)
      }

      throw new Error('must provide id or speciesID')
    },
    allSpecies: async (_, args, {dataSources: {SWAPI}}) => {
      const {objects, totalCount} = await SWAPI.getAllData('species')
      return {
        totalCount,
        ...connectionFromArray(objects, args)
      }
    }
  },
  Species: {
    id: ({id}) => toGlobalId('species', id),
    averageHeight: ({average_height}) => average_height,
    averageLifespan: ({average_lifespan}) => average_lifespan,
    eyeColors: ({eye_colors}) => arrayList(eye_colors),
    hairColors: ({hair_colors}) => arrayList(hair_colors),
    skinColors: ({skin_colors}) => arrayList(skin_colors),
    homeworld: ({homeworld}, _, {dataSources: {SWAPI}}) =>
      SWAPI.getData(homeworld.split('/')[4], homeworld.split('/')[5]),
    personConnection: (obj, args, {dataSources}) =>
      connectionResolver('people', obj, args, dataSources),
    filmConnection: (obj, args, {dataSources}) =>
      connectionResolver('films', obj, args, dataSources)
  },
  SpeciesConnection: {
    species: conn => conn.edges.map(edge => edge.node)
  },
  SpeciesPeopleConnection: {
    people: conn => conn.edges.map(edge => edge.node)
  },
  SpeciesFilmsConnection: {
    films: conn => conn.edges.map(edge => edge.node)
  }
}
