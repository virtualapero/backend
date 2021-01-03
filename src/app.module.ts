import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AperoModule} from './apero/apero.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
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
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get('ENV') === "DEV",
            }),
            inject: [
                ConfigService
            ]
        }),
        AperoModule
    ],
})
export class AppModule {
}
