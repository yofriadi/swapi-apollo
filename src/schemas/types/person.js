const {gql} = require('apollo-server')

module.exports = gql`
  "An individual person or character within the Star Wars universe."
  type Person {

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
    height: Int

    "The mass of the person in kilograms."
    mass: Float

    "The skin color of this person."
    skinColor: String

    "A planet that this person was born on or inhabits."
    homeworld: Planet
  }

  extend type Query {
    person(
      id: ID
      personID: ID
    ): Person
  }
`
