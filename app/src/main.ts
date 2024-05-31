import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bartender')
    .setDescription('API documentation').build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, document);

  // const config = await app.get(ConfigService);
  await app.listen(3000, () => console.log('Run success. PORT: 3000' ));
}

bootstrap();
