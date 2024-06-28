import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
  };
  app.enableCors(corsOptions);
  
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
