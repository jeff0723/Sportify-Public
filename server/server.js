const { ApolloServer } = require('apollo-server-express');
const http = require('http');

const { graphqlUploadExpress } = require('graphql-upload');
const { typeDefs, resolvers } = require('graphql-scalars');
const routes = require('./routes');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 2 }));
app.use('/', routes);

const self_typeDefs = require('./graphql/schema.graphql');
const self_resolvers = require('./graphql/resolvers');

const buildPath = '../build';
app.use(express.static(buildPath));
const publicPath = `${__dirname}/public`;
app.use('/public', express.static(publicPath));

require('dotenv').config({ path: `${__dirname}/../.env` });

const port = process.env.SERVER_PORT || 5000;
const MONGO_DB = process.env.ATLAS_URI;


mongoose.connect(MONGO_DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
})

db.once('open', () => {
  console.log('MongoDB connected!')


  const server = new ApolloServer({
    typeDefs: [...typeDefs, self_typeDefs],
    resolvers: { ...resolvers, ...self_resolvers },
    uploads: false
  });

  server.applyMiddleware({ app });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, buildPath, 'index.html'));
  })

  // const httpServer = http.createServer(app);
  // server.installSubscriptionHandlers(httpServer);

  // new Promise(resolve => server.listen(port, resolve));
  // console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  // console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
  new Promise(resolve => app.listen({ port: port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
})