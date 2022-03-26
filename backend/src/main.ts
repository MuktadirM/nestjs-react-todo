import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Todo Api')
      .setDescription('My Todo API')
      .setVersion('1.0')
      .build());
    SwaggerModule.setup('api', app, document);
  }
  
  await app.listen(3000);
}
bootstrap();
