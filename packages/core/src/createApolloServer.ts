import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.ts";

const DEFAULT_GRAPHQL_PATH = "/graphql";
const { BODY_PARSER_SIZE_LIMIT } = config;

type Options = {
  schemas: string;
  resolvers: object;
  functionsByType: object;
  typeDefsObj: any;
  defaultHttpService: Function;
  optionsPath?: string;
};

type Server = {
  apolloServer: any;
  expressApp: any;
  httpServer: any;
  path: string;
};

interface MyContext {
  token?: string;
}

export default async function createApolloServer(
  options: Options,
): Promise<Server> {
  const {
    schemas,
    resolvers,
    functionsByType,
    typeDefsObj,
    defaultHttpService,
    optionsPath,
  } = options;

  const path = optionsPath || DEFAULT_GRAPHQL_PATH;

  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  app.use(path, bodyParser.json({ limit: BODY_PARSER_SIZE_LIMIT }), cors());

  return {
    apolloServer,
    expressApp: app,
    httpServer,
    path,
  };
}
