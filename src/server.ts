/* we need to initialize dot env before everything else */
/* eslint-disable @typescript-eslint/no-var-requires */
require('custom-env').env(true);
require('dotenv').config();

/* eslint-disable */
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import { Model } from 'objection';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { Server as HttpServer } from 'http';
import knexConnection from '../knexConnection';
import { logger, loggerHttp } from './utils/logger';
import { AppRoutes, noAuthRoutes } from './routes/routes';
import handleError, { handleErrorMiddleware } from './lib/errors/handleError';
require("./utils/passport");

/* eslint-enable */

class Server {
  private app: express.Application;
  private server: HttpServer | null;
  private port: number | null;

  constructor() {
    this.app = express(); // init the application
    this.port = Number(process.env.PORT);
    this.server = null;
    this.configuration();
    this.routes();
    this.errorHandling();
  }

  /**
   * Configure the server
   */
  public configuration() {
    const { app } = this;
    process.on('unhandledRejection', (reason) => {
      throw reason;
    });

    process.on('uncaughtException', (error) => {
      logger.error('Handling uncaught exception...');
      handleError(error);
    });

    this.app.set('port', this.port);
    this.app.use(helmet());
    this.app.use(express.json({ limit: '1mb', type: 'application/json' }));
    this.app.use(
      express.raw({
        inflate: true,
        limit: '1mb',
        type: () => true, // this matches all content types
      }),
    );
    this.app.use(loggerHttp);
    this.app.use(morgan('dev'));
    this.app.set('trust proxy', 1);
    this.app.use(cookieParser());
    this.app.use(
      cookieSession({
        name: 'session',
        keys: ['cyberwolve'],
        maxAge: 24 * 60 * 60 * 100,
        domain: process.env.NODE_ENV === 'local' ? 'harborsiderx-frontend.vercel.app' : 'localhost', // Replace with your domain
        secure: process.env.NODE_ENV === 'local', // Use secure cookies in production
        sameSite: 'strict', // Use SameSite attribute
        httpOnly: false,
      }),
    );
    this.app.use(passport.initialize({ userProperty: 'user' }));
    this.app.use(passport.session());
    this.app.use(
      cors({
        origin: process.env.ALLOWED_URL!,
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
      }),
    );
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.ALLOWED_URL!); // Replace with your frontend domain
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true'); // Allow cookies to be sent from frontend
      next();
    });
    Model.knex(knexConnection[process.env.ENV || 'dev']);
  }

  /**
   * Configure the routes
   */
  public async routes() {
    noAuthRoutes.forEach((route) => {
      this.app.use(`/api${route.path}`, route.middleware, route.action);
    });
    AppRoutes.forEach((route) => {
      this.app.use(`/api${route.path}`, route.middleware, route.action);
    });
  }

  public errorHandling() {
    this.app.use(handleErrorMiddleware);
  }

  public get address() {
    if (!this.server) return null;
    return this.server.address();
  }

  /**
   * start the server
   */
  public start() {
    this.app.listen(this.app.get('port'), async () => {
      logger.info(`Server listening ${this.app.get('port') || 'random'} port.`);
      console.log('env', process.env.ENV);
      console.log(process.env.DB_TYPE,
        process.env.DB_HOST,
        process.env.DB_NAME,
        process.env.DB_PORT,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        process.env.DB_SCHEMA);
    });
  }
}

const server = new Server();
server.start();

export default server;
