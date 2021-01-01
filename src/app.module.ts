import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AperoModule} from './apero/apero.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadModels: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    AperoModule
  ],
})
export class AppModule {
}
