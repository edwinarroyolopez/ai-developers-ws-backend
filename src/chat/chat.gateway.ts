import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })  // habilitamos CORS para permitir conexiones desde diferentes orígenes
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Evento para enviar mensajes a todos los usuarios
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { username: string; text: string }): Promise<void> {
    const message = await this.chatService.createMessage(data.username, data.text);
    this.server.emit('receiveMessage', message);
  }

  // Evento para obtener todos los mensajes al conectarse
  @SubscribeMessage('getMessages')
  async handleGetMessages(): Promise<void> {
    const messages = await this.chatService.findAllMessages();
    this.server.emit('allMessages', messages);
  }
}
