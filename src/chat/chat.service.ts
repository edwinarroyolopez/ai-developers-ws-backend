import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async createMessage(username: string, text: string): Promise<Message> {
    const newMessage = new this.messageModel({ username, text });
    return newMessage.save();
  }

  async findAllMessages(): Promise<Message[]> {
    return this.messageModel.find().sort({ createdAt: 1 }).exec();
  }
}
