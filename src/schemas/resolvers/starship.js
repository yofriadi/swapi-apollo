const {getObjectFromTypeAndId, arrayList} = require('../../helpers')
const {toGlobalId, fromGlobalId} = require('../../relay')

module.exports = {
  Query: {
    starship: (_, {id, starshipID}) => {
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

      if (starshipID !== undefined && starshipID !== null) {
        return getObjectFromTypeAndId('starships', starshipID)
      }

      throw new Error('must provide id or starshipID')
    }
  },
  Starship: {
    id: ({id}) => toGlobalId('starships', id),
    starshipClass: ({starship_class}) => starship_class,
    manufacturers: ({manufacturer}) => arrayList(manufacturer),
    costInCredits: ({cost_in_credits}) => cost_in_credits,
    maxAtmospheringSpeed: ({max_atmosphering_speed}) => max_atmosphering_speed,
    hyperdriveRating: ({hyperdrive_rating}) => hyperdrive_rating,
    cargoCapacity: ({cargo_capacity}) => cargo_capacity
  }
}
