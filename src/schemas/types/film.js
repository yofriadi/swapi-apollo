const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  id,
  created,
  edited
} = commonFields()

module.exports = gql`
  "A single film."
  type Film {

    ${id}

    ${created}

    ${edited}

    "The title of this film."
    title: String

    "The episode number of this film."
    episodeID: Int

    "The opening paragraphs at the beginning of this film."
    openingCrawl: String

    "The name of the director of this film."
    director: String

    "The name(s) of the producer(s) of this film."
    producers: [String]

    "The ISO 8601 date format of film release at original creator country."
    releaseDate: String
  }

  type Query {
    film(
      id: ID
      filmID: ID
    ): Film
  }
`
