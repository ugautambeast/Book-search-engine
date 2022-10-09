const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} = require('apollo-server-core')
const typeDefs = require('./schemaGql.js')
const jwt = require('jsonwebtoken')
const env = require("dotenv");
const express = require('express');
const http = require('http');
const path = require('path');
var __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);


//ENVIRONMENT VARIABLE/CONSTANTS
env.config();

// CONNECT DB
require("./config/connection");

//import models here
const User = require('./models/User.js');

const resolvers = require('./resolvers.js');

// this is middleware
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
    return { userId }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

if (process.env.NODE_ENV == "production") {
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

(async () => {
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql'
  });
})();

httpServer.listen(process.env.PORT, () => {
  console.log(`🚀  Server ready at 4000 ${server.graphqlPath}`);
})
