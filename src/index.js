const {ApolloServer} = require('apollo-server');

const schema = require('./schemas')
const SWAPI = require('./api')

const playground = {
  settings: {
    'editor.theme': 'dark',
    'editor.cursorShape': 'block',
    'editor.fontSize': 16,
    'editor.fontFamily': "'Operator Mono Book'"
  }
}

const server = new ApolloServer({
  schema,
  dataSources: () => ({ SWAPI: new SWAPI() }),
  tracing: true,
  playground
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
