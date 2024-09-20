import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:rWeVEaQQybRuBAxlLUivMciKswnJLdUB@junction.proxy.rlwy.net:53424'), // Cambia la URL si usas MongoDB Atlas
    ChatModule,
  ],
})
export class AppModule {}
