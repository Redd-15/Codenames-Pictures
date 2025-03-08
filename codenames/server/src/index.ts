import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { SocketHandler } from './socket';

async function main() {
  try {
    //Create express app, use json and cors
    const app = express();
    app.use(express.json());
    app.use(cors());

    //Add socket handling
    const httpServer = createServer(app);
    const handler = new SocketHandler(httpServer);

    httpServer.listen(3000, () => {
      console.log(`Listening on port 3000...`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
