import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Message } from './schemas/message.schema';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) { }

  async handleConnection(client: Socket) {
    // Enviar todos los mensajes al conectarse
    const messages = await this.chatService.getAllMessages();
    client.emit('allMessages', messages);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createMessage')
  async handleMessage(
    @MessageBody() { username, text }: { username: string; text: string },
  ): Promise<void> {
    console.log({ username, text })

    const newMessage = await this.chatService.createMessage(
      username,
      text,
    );
    // Enviar el mensaje a todos los clientes conectados
    this.server.emit('newMessage', newMessage);
  }
}
