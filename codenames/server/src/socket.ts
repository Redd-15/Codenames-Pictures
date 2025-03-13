import { Server, ServerOptions } from "socket.io";
import { IncomingMessage, ServerResponse } from "http";
import { Server as HttpServer } from "http";
import { ServerMessageType, ClientMessageType } from "../../model"

/** Realises the server side of socket communication */
export class SocketHandler {

  private io: Server;

  constructor(httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse> | Partial<ServerOptions>) {
    this.io = new Server(httpServer);
    this.setUp();
  }

  private setUp() {
    //Configure listener for socket connection
    this.io.on("connection", (socket) => {
      const cookies = socket.handshake.headers.cookie;
      const parsedCookies = this.parseCookies(cookies);
      console.log("Parsed Cookies:", parsedCookies);
      //TODO create room if creation, put user in room if join request, send error message back if room does not exist
      //Send message back to client by socket id
      this.io.to(socket.id).emit(ServerMessageType.TestMessage, 'You are connected');

      //Configure listeners for different message types and disconnection on socket
      socket.on(ClientMessageType.TestMessage, (content) => {
        console.log(`Client ${socket.id} sent: ${content}`);
      })

      socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
      });
    });
  }

  /** Parse cookies string into an object with name:value pairs. Returns empty object if cookies is undefined. */
  private parseCookies(cookies: string | undefined){
    return Object.fromEntries(cookies?.split("; ").map((c) => c.split("=")) || []);
  }
}
