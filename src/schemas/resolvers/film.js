const {
  getObjectFromTypeAndId,
  getObjectsByType,
  arrayList
} = require('../../helpers')
const {
  toGlobalId,
  fromGlobalId,
  connectionResolver
} = require('../../relay')

module.exports = {
  Query: {
    film: (_, {id, filmID}) => {
      if (id !== undefined && id !== null) {
        const {type, id: globalId} = fromGlobalId(id);

        if (
          globalId === null ||
          globalId === undefined ||
          globalId === ''
        ) {
          throw new Error(`No valid ID extracted from ${id}`)
        }
        return getObjectFromTypeAndId(type, globalId)
      }

      if (filmID !== undefined && filmID !== null) {
        return getObjectFromTypeAndId('films', filmID)
      }

      throw new Error('must provide id or filmID')
    },
    allFilms: async (_, args) => {
      const {objects, totalCount} = await getObjectsByType('films')
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
    speciesConnection: (obj, args) => connectionResolver('species', obj, args),
    starshipConnection: (obj, args) => connectionResolver('starships', obj, args),
    vehicleConnection: (obj, args) => connectionResolver('vehicles', obj, args),
    characterConnection: (obj, args) => connectionResolver('characters', obj, args),
    planetConnection: (obj, args) => connectionResolver('planets', obj, args)
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
