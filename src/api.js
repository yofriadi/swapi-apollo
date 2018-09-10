const swapiData = require('../cache/data')

const getFromLocalUrl = url => {
  const text = swapiData[url]

  if (!text) {
    throw new Error(`No entry in local cache for ${url}`)
  }

  return text
}

module.exports = getFromLocalUrl
