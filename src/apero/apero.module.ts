import {Module} from '@nestjs/common';
import {AperoController} from "./apero.controller";
import {AperoService} from "./apero.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Apero, Link, Topic} from "./apero.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Apero,
            Topic,
            Link
        ])
    ],
    controllers: [
        AperoController,
    ],
    providers: [
        AperoService,
    ],
})
export class AperoModule {
}
