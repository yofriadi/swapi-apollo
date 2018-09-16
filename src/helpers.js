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

const arrayList = str => str.split(', ')

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

module.exports = {
  getObjectFromTypeAndId,
  getObjectFromUrl,
  arrayList,
  commonFields
}
