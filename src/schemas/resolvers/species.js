const {getObjectFromTypeAndId, arrayList} = require('../../helpers')
const {toGlobalId, fromGlobalId} = require('../../relay')

module.exports = {
  Query: {
    species: (_, {id, speciesID}) => {
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

      if (speciesID !== undefined && speciesID !== null) {
        return getObjectFromTypeAndId('species', speciesID)
      }

      throw new Error('must provide id or speciesID')
    }
  },
  Species: {
    id: ({id}) => toGlobalId('species', id),
    averageHeight: ({average_height}) => average_height,
    averageLifespan: ({average_lifespan}) => average_lifespan,
    eyeColors: ({eye_colors}) => arrayList(eye_colors),
    hairColors: ({hair_colors}) => arrayList(hair_colors),
    skinColors: ({skin_colors}) => arrayList(skin_colors)
  }
}
