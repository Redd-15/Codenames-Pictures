import { Server, ServerOptions, Socket } from "socket.io";
import { IncomingMessage, ServerResponse } from "http";
import { Server as HttpServer } from "http";
import { ServerMessageType, ClientMessageType } from "../../model"
import { ServerHandlers } from "./handlers";
import { CodenamesDatabase } from "./database";
import { JoinMessage } from "../../model/message-interfaces";

/** Realises the server side of socket communication */
export class SocketHandler {

  private io: Server;
  private handlers: ServerHandlers | null; // Initialize handlers to null
  private database: CodenamesDatabase; // Database instance

  constructor(httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse> | Partial<ServerOptions>, database: CodenamesDatabase) {
    this.io = new Server(httpServer);
    this.database = database
    this.handlers = null; // Initialize handlers with null socket instance
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
      this.handlers = new ServerHandlers(this.io, socket, this.database); // Initialize handlers with the current socket instance
      
      //Configure listeners for different message types and disconnection on socket
      socket.on(ClientMessageType.TestMessage, (content) => this.handlers?.clientTestMessageHandler(content));
      socket.on(ClientMessageType.CreateRoom, (username) => this.handlers?.createRoomHandler(username));
      socket.on(ClientMessageType.JoinRoom, (json) => {
        const join : JoinMessage = JSON.parse(json); // Destructure the JSON object to get JoinMessage
        this.handlers?.joinRoomHandler(join.username, join.roomId)
      });
      socket.on(ClientMessageType.LeaveRoom, (content) => this.handlers?.leaveRoomHandler());

      socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
      });
    });
  }

  private checkHandlers(handler : any) {
    if (!this.handlers) {
      return console.error("Handlers are not initialized.");
    }
    return handler;
  }

  /** Parse cookies string into an object with name:value pairs. Returns empty object if cookies is undefined. */
  private parseCookies(cookies: string | undefined){
    return Object.fromEntries(cookies?.split("; ").map((c) => c.split("=")) || []);
  }
}

