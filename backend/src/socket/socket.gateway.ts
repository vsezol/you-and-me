import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Message {
  from: string;
  to: string;
  content: string;
}

@WebSocketGateway(5000, { cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private socketsByNames: {
    [ket: string]: Socket;
  } = {};

  @SubscribeMessage('send-message')
  handleSendMessage(@MessageBody() message: Message): void {
    const socket = this.socketsByNames[message.to];
    socket.emit('new-message', message);
  }

  @SubscribeMessage('register-name')
  handleRegisterUser(
    @ConnectedSocket() connectedSocket: Socket,
    @MessageBody() username: string
  ) {
    console.log('SOCKER REGISTERED', username);
    this.socketsByNames[username] = connectedSocket;
  }

  afterInit(server: Server): void {
    console.log('WS INITIATED');
  }

  handleConnection(socket: Socket): void {
    console.log('SOCKET CONNECTED', socket.id);
  }

  handleDisconnect(socket: Socket): void {
    console.log('SOCKET DISCONNECTED', socket.id);
  }
}
