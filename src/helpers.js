const DataLoader = require('dataloader')

const objectWithId = obj => {
  obj.id = parseInt(obj.url.split('/')[5], 10)
  return obj
}

const arrayList = str => str ? str.split(', ').map(s => s.trim()) : str

const commonFields = () => `
  "The ID of an object."
  id: ID!

  "The ISO 8601 date format of the time that this resource was created."
  created: String

  "The ISO 8601 date format of the time that this resource was edited."
  edited: String
`

const getObjectsFromUrls = async (urls, {SWAPI}) => {
  const array = await Promise.all(urls.map(url =>
    SWAPI.getData(url.split('/')[4], url.split('/')[5])))
  return sortObjectsById(array)
}

const sortObjectsById = array => array.sort((a, b) => a.id - b.id)

const getNextUrl = (type, url) => {
  if (!url) return null
  const [, params] = url.split('/?')
  return `${type}/?${params}`
}

module.exports = {
  getObjectsFromUrls,
  arrayList,
  commonFields,
  objectWithId,
  getNextUrl,
  sortObjectsById
}
