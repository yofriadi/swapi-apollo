const DataLoader = require('dataloader')
// const fetch = require('node-fetch')
const getFromLocalUrl = require('./api')

const getObjectFromTypeAndId = async (type, id) =>
  getObjectFromUrl(`https://swapi.co/api/${type}/${id}/`)

const getObjectFromUrl = async url => {
  const data = await localUrlLoader.load(url)
  return objectWithId(data)
}

const localUrlLoader = new DataLoader(
  urls => Promise.all(urls.map(getFromLocalUrl))
)

const objectWithId = obj => {
  obj.id = parseInt(obj.url.split('/')[5], 10)
  return obj
}

/* const fetchSWAPI = async url => {
  const data = await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err))
  return data
} */

const arrayList = str => str ? str.split(', ').map(s => s.trim()) : str

const commonFields = () => ({
  id: `
    "The ID of an object."
    id: ID!
  `,
  created: `
    "The ISO 8601 date format of the time that this resource was created."
    created: String
  `,
  edited: `
    "The ISO 8601 date format of the time that this resource was edited."
    edited: String
  `
})

const getObjectsByType = async type => {
  let objects = []
  let nextUrl = `https://swapi.co/api/${type}/`
  while(nextUrl) {
    const pageData = await localUrlLoader.load(nextUrl)
    objects = objects.concat(pageData.results.map(objectWithId))
    nextUrl = pageData.next
  }
  objects = sortObjectsById(objects)
  return {
    objects,
    totalCount: objects.length
  }
}

const getObjectsFromUrls = async urls => {
  const array = await Promise.all(urls.map(getObjectFromUrl))
  return sortObjectsById(array)
}

const sortObjectsById = array => array.sort((a, b) => a.id - b.id)

module.exports = {
  getObjectFromTypeAndId,
  getObjectFromUrl,
  getObjectsFromUrls,
  getObjectsByType,
  arrayList,
  commonFields
}
