import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar CORS para un origen específico
  app.enableCors({
    origin: 'https://ai-developers-ws-frontend-5drsn1gao-edwinarroyolopezs-projects.vercel.app', // El dominio del frontend en Vercel
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,  // Permitir cookies y credenciales
  });

  await app.listen(4000);
}
bootstrap();
