import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const PORT = +process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  bootstrapSwagger(app);

  await app.listen(PORT, () => {
    console.log(`[Nest] app started on port ${PORT}`);
  });
}

bootstrap();

function bootstrapSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('You&Me')
    .setDescription('Documentation for REST API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);
}
