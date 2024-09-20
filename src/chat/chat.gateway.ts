import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })  // Habilitar CORS si es necesario
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Manejar cuando un cliente se conecta
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    // Aquí podrías emitir un mensaje a todos indicando que un nuevo usuario se ha unido
    client.emit('connected', 'Bienvenido al chat');
    
  }

  // Manejar cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    // Aquí podrías emitir un mensaje a todos indicando que el usuario se fue
    this.server.emit('disconnected', `El cliente con id ${client.id} se ha desconectado`);
  }

  // Evento para manejar el envío de mensajes
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { username: string; text: string }): Promise<void> {
    const message = await this.chatService.createMessage(data.username, data.text);
    this.server.emit('receiveMessage', message);
  }

  // Evento para obtener todos los mensajes almacenados
  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket): Promise<void> {
    const messages = await this.chatService.findAllMessages();
    console.log('allMessages');
    client.emit('allMessages', messages);
  }
}
