import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './schemas/message.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getAllMessages(): Promise<Message[]> {
    return this.chatService.getAllMessages();
  }
}
