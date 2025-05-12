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
    this.handlers = new ServerHandlers(this.io, this.database);

    this.io.on("connection", (socket) => {
      const cookies = socket.handshake.headers.cookie;
      const parsedCookies = this.parseCookies(cookies);
      console.log("Parsed Cookies:", parsedCookies);

      //Send message back to client by socket id
      this.io.to(socket.id).emit(ServerMessageType.ConnectAck);
       // Initialize handlers with the current socket instance
      
      this.handlers?.cookieHandler(socket, parsedCookies); // Call the cookie handler to check if player was in room already

      //Configure listeners for different message types and disconnection on socket
      socket.on(ClientMessageType.TestMessage, (content) => this.handlers?.clientTestMessageHandler(socket, content));
      socket.on(ClientMessageType.CreateRoom, (username) => this.handlers?.createRoomHandler(socket, username));
      socket.on(ClientMessageType.JoinRoom, (join) => this.handlers?.joinRoomHandler(socket, join.username, join.roomId));
      socket.on(ClientMessageType.LeaveRoom, (content) => this.handlers?.leaveRoomHandler(socket));
      socket.on(ClientMessageType.GetId, (content) => this.handlers?.getIdHandler(socket));
      socket.on(ClientMessageType.PickPosition, (content) => this.handlers?.pickPositionHandler(socket, content.team, content.spymaster));
      socket.on(ClientMessageType.StartGame, (content) => this.handlers?.startGameHandler(socket));
      socket.on(ClientMessageType.GiveHint, (content) => this.handlers?.giveHintHandler(socket, content.word, content.number));
      socket.on(ClientMessageType.MakeGuess, (content) => this.handlers?.makeGuessHandler(socket, content.guess));
      socket.on(ClientMessageType.EndGuessing, (content) => this.handlers?.endGuessingHandler(socket));

      socket.on('disconnect', () => {
        this.handlers?.disconnectHandler(socket); // Call leaveRoomHandler on disconnect
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

