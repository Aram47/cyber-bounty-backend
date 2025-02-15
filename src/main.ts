import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('cyber bounty platform')
    .setDescription('Docmentation for the bacend task')
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  const port = configService.get<string>('PORT') ?? 3000;
  const host = configService.get<string>('HOST') ?? 'localhost';
  await app.listen(port, host, () =>
    console.log(`Listening on http://${host}:${port}`),
  );
}

bootstrap();
