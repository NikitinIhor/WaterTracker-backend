import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { waterTrackerRouter } from './routers/waterTracker.js';
import { env } from './utils/env.js';

const PORT = env('PORT');

export const startServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(cors());
  app.use(logger);
  app.use(express.json());

  // routes
  app.use('/waterTracker', waterTrackerRouter);

  app.use((req, res, next) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
    next();
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
};
