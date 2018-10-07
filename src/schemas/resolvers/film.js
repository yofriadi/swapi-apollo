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
    film: (_, {id, filmID}, {dataSources: {SWAPI}}) => {
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

      if (filmID !== undefined && filmID !== null) {
        return SWAPI.getData('films', filmID)
      }

      throw new Error('must provide id or filmID')
    },
    allFilms: async (_, args, {dataSources: {SWAPI}}) => {
      const {objects, totalCount} = await SWAPI.getAllData('films')
      return {
        totalCount,
        ...connectionFromArray(objects, args)
      }
    }
  },
  Film: {
    id: ({id}) => toGlobalId('films', id),
    episodeID: ({episode_id}) => episode_id,
    openingCrawl: ({opening_crawl}) => opening_crawl,
    producers: ({producer}) => arrayList(producer),
    releaseDate: ({release_date}) => release_date,
    speciesConnection: (obj, args, {dataSources}) =>
      connectionResolver('species', obj, args, dataSources),
    starshipConnection: (obj, args, {dataSources}) =>
      connectionResolver('starships', obj, args, dataSources),
    vehicleConnection: (obj, args, {dataSources}) =>
      connectionResolver('vehicles', obj, args, dataSources),
    characterConnection: (obj, args, {dataSources}) =>
      connectionResolver('characters', obj, args, dataSources),
    planetConnection: (obj, args, {dataSources}) =>
      connectionResolver('planets', obj, args, dataSources)
  },
  FilmsConnection: {
    films: conn => conn.edges.map(edge => edge.node)
  },
  FilmSpeciesConnection: {
    species: conn => conn.edges.map(edge => edge.node)
  },
  FilmStarshipsConnection: {
    starships: conn => conn.edges.map(edge => edge.node)
  },
  FilmVehiclesConnection: {
    vehicles: conn => conn.edges.map(edge => edge.node)
  },
  FilmCharactersConnection: {
    characters: conn => conn.edges.map(edge => edge.node)
  },
  FilmPlanetsConnection: {
    planets: conn => conn.edges.map(edge => edge.node)
  }
}
