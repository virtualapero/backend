import {Module} from '@nestjs/common';
import {AperoController} from "./apero.controller";
import {AperoService} from "./apero.service";
import {SequelizeModule} from "@nestjs/sequelize";
import Apero, {Link, Topic} from "./apero.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Apero, Topic, Link]),
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
