const {ApolloServer} = require('apollo-server');

const schema = require('./schemas')

const playground = {
  settings: {
    'editor.cursorShape': 'block',
    'editor.fontSize': 16,
    'editor.fontFamily': "'Operator Mono Book'"
  }
}

const server = new ApolloServer({
  schema,
  tracing: true,
  playground
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
