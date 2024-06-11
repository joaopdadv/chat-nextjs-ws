import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  cors:{
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly prisma: PrismaService) {}

  private clients: Map<string, string> = new Map();

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    // this.handleDisconnect(client) Disconnect the client existent with the same ID
    this.clients.set(client.handshake.query.clientId.toString(), client.id);
    console.log(`Client connected: ${client.handshake.query.clientId.toString()} / ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.handshake.query.clientId.toString());
    console.log(`Client disconnected:${client.id} / ${client.handshake.query.clientId}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: {to: string, message: string}) {
    console.log(`Message from client ${client.id}, to ${payload.to}, message: ${payload.message}`);
    const clientTarget = this.clients.get(payload.to);
    if(clientTarget) {
      await this.prisma.message.create({
        data: {
          from: client.handshake.query.clientId.toString(),
          to: payload.to,
          message: payload.message
        }
      });
    }
    return this.server.to(clientTarget).emit('message', {from: client.id, message: payload.message});
  }
}
