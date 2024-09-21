import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async createMessage(username: string, text: string): Promise<Message> {
    const newMessage = new this.messageModel({ username, text });
    return newMessage.save();
  }
}
