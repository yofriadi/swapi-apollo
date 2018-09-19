const {gql} = require('apollo-server')

const {commonFields} = require('../../helpers')

const {
  id,
  created,
  edited
} = commonFields()

module.exports = gql`
  "An individual person or character within the Star Wars universe."
  type Person {

    ${id}

    ${created}

    ${edited}

    "The name of this person."
    name: String

    "The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope."
    birthYear: String

    "The eye color of this person. Will be 'unknown' if not known or 'n/a' if the person does not have an eye."
    eyeColor: String

    "The gender of this person. Either 'Male', 'Female' or 'unknown', 'n/a' if the person does not have a gender."
    gender: String

    "The hair color of this person. Will be 'unknown' if not known or 'n/a' if the person does not have hair."
    hairColor: String

    "The height of the person in centimeters."
    height: String  # Int before

    "The mass of the person in kilograms."
    mass: String  # Float before

    "The skin color of this person."
    skinColor: String

    "A planet that this person was born on or inhabits."
    homeworld: Planet
  }

  "An edge in a connection."
  type PeopleEdge {
 
    "A cursor for use in pagination."
    cursor: String!

    "The item at the end of the edge."
    node: Person
  }

  "A connection to a list of items."
  type PeopleConnection {

    "A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing '5' as the argument to 'first', then fetch the total count so it could display '5 of 83', for example."
    totalCount: Int

    "Information to aid in pagination."
    pageInfo: PageInfo!

    "A list of edges."
    edges: [PeopleEdge]

    "A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for '{ edges { node } }' when no edge data is needed, this field can be be used instead. Note that when clients like Relay need to fetch the 'cursor' field on the edge to enable efficient pagination, this shortcut cannot be used, and the full '{ edges { node } }' version should be used instead."
    people: [Person]
  }

  extend type Query {
    "Get one person."
    person(
      id: ID
      personID: ID
    ): Person

    "Get all people."
    allPeople(
      after: String
      first: Int
      before: String
      last: Int
    ): PeopleConnection
  }
`
