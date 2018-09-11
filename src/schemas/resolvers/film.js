const {getObjectFromTypeAndId, arrayList} = require('../../helpers')
const {toGlobalId, fromGlobalId} = require('../../relay')

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
    }
  },
  Film: {
    id: ({id}) => toGlobalId('films', id),
    episodeID: ({episode_id}) => episode_id,
    openingCrawl: ({opening_crawl}) => opening_crawl,
    producers: ({producer}) => arrayList(producer),
    releaseDate: ({release_date}) => release_date
  }
}
