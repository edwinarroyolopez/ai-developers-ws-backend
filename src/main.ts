import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para cualquier origen
  app.enableCors({
    origin: '*',  // Permitir cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,  // Permite el uso de cookies, si es necesario
  });

  await app.listen(4000);
}
bootstrap();
