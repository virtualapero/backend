import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {AperoModule} from "../src/apero/apero.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as request from 'supertest';
import {config} from "rxjs";

describe('Apero', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRootAsync({
                    imports: [
                        ConfigModule,
                    ],
                    useFactory: (configService: ConfigService) => ({
                        type: 'mysql',
                        host: configService.get('HOST'),
                        port: +configService.get<number>('PORT'),
                        username: configService.get('USERNAME'),
                        password: configService.get('PASSWORD'),
                        database: configService.get('DATABASE'),
                        entities: ['src/**/*.entity{.ts,.js}'],
                        synchronize: true,
                    }),
                    inject: [
                        ConfigService
                    ]
                }),
                AperoModule
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`GET aperos`, () => {
        return request(app.getHttpServer())
            .get('/apero')
            .expect(200)
            .expect([]);
    });

    it(`GET apero`, () => {
        return request(app.getHttpServer())
            .get('/apero/1')
            .expect(404)
            .expect( { statusCode: 404, message: 'Not Found' });
    });

    it(`POST apero`, () => {
        return request(app.getHttpServer())
            .post('/apero')
            .send({
                date: "2021-01-01",
                member: 8,
                topics: []
            })
            .expect(201)
    });

    it(`GET apero (check POST)`, () => {
        return request(app.getHttpServer())
            .get('/apero/1')
            .expect(200)
            .expect( {
                date: "2021-01-01",
                member: 8,
                topics: []
            });
    });

    it(`PATCH apero`, () => {
        return request(app.getHttpServer())
            .patch('/apero')
            .send({
                id: 1,
                date: "2021-02-01",
            })
            .expect(200)
    });

    it(`GET apero (check POST)`, () => {
        return request(app.getHttpServer())
            .get('/apero/1')
            .expect(200)
            .expect( {
                date: "2021-02-01",
                member: 8,
                topics: []
            });
    });

    it(`GET aperos (with data)`, () => {
        return request(app.getHttpServer())
            .get('/apero')
            .expect(200)
            .expect([
                {
                    date: "2021-02-01",
                    member: 8,
                    topics: []
                }
            ]);
    });

    it(`DELETE apero`, () => {
        return request(app.getHttpServer())
            .delete('/apero/1')
            .expect(200)
    });

    it(`GET apero (check DELETE)`, () => {
        return request(app.getHttpServer())
            .get('/apero/1')
            .expect(404)
            .expect( { statusCode: 404, message: 'Not Found' });
    });

    afterAll(async () => {
        await app.close();
    });
});