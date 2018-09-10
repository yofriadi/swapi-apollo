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

module.exports = {
  getObjectFromTypeAndId
}
