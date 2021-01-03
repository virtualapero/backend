import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {version} from "../package.json"
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe({transform: true}));
    app.disable("x-powered-by");

    setupSwagger(app);

    await app.listen(8000);
}

function setupSwagger(app: NestExpressApplication): void {
    const options = new DocumentBuilder()
        .setTitle("#virtualapero")
        .setVersion(version)
        .addTag("apero", "All about the Aperos")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, document)
}

bootstrap();
