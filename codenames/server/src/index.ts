import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { SocketHandler } from './socket';
import { CodenamesDatabase } from './database';

async function main() {
  try {
    //Create express app, use json and cors
    const app = express();
    app.use(express.json());
    app.use(cors());

    //Add socket handling
    const httpServer = createServer(app);
    const database = new CodenamesDatabase(); // Create a new instance of the database
    const handler = new SocketHandler(httpServer, database);

    httpServer.listen(3000, () => {
      console.log(`Listening on port 3000...`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
