const {getObjectFromTypeAndId, getObjectFromUrl} = require('../../helpers')
const {fromGlobalId, toGlobalId} = require('../../relay')

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
    }
  },
  Person: {
    id: ({id}) => toGlobalId('people', id),
    birthYear: ({birth_year}) => birth_year,
    eyeColor: ({eye_color}) => eye_color,
    hairColor: ({hair_color}) => hair_color,
    skinColor: ({skin_color}) => skin_color,
    homeworld: ({homeworld}) => getObjectFromUrl(homeworld)
  }
}
