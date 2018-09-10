const {getObjectFromTypeAndId} = require('../../helpers')

const base64 = i => Buffer.from(i, 'utf8').toString('base64')

module.exports = {
  Query: {
    film: async (_, args) => {
      if (args.filmID !== undefined && args.filmID !== null) {
        return getObjectFromTypeAndId('films', args.filmID)
      }

      throw new Error('must provide id or filmID')
    }
  },
  Film: {
    id: ({id}) => base64(['films', id].join(':')),
    episodeID: ({episode_id}) => episode_id,
    openingCrawl: ({opening_crawl}) => opening_crawl,
    producers: ({producer}) => producer.split(', '),
    releaseDate: ({release_date}) => release_date
  }
}
