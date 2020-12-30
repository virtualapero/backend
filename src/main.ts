import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {version} from "../package.json"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle("#virtualapero")
      .setVersion(version)
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("", app, document)

  await app.listen(8000);
}

bootstrap();
