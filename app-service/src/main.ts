import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('cyber bounty platform')
    .setDescription('Docmentation for the bacend task')
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);

  app.use(cookieParser(configService.get<string>('COOKIE_SECRET')));

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  const port = configService.get<string>('PORT') ?? 3000;
  await app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
}

bootstrap();
