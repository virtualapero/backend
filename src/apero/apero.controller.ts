import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import Apero from "./apero.model";
import {AperoService} from "./apero.service";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {PaginatorDto} from "../dto/paginator.dto";
import CreateAperoDto from "./dto/create.dto";
import AperoUpdateDto from "./dto/update.dto";

@ApiTags("apero")
@Controller('apero')
export class AperoController {

    constructor(private aperoService: AperoService) {
    }

    @Get()
    @ApiOkResponse({type: [Apero], description: "Get all Aperos"})
    @ApiBadRequestResponse({description: "Validation failed"})
    getAll(@Query() paginator: PaginatorDto): Promise<Apero[]> {
        return this.aperoService.findAll(paginator);
    }

    @Get("/:id")
    @ApiOkResponse({type: [Apero], description: "Get one Apero"})
    @ApiBadRequestResponse({description: "Validation failed"})
    @ApiNotFoundResponse({description: "Apero not found"})
    async getOneById(@Param("id", ParseIntPipe) id: number): Promise<Apero> {
        let apero = await this.aperoService.findOneByID(id);

        if (!apero) {
            throw new NotFoundException();
        }

        return apero;
    }

    @Post()
    @ApiCreatedResponse({description: "Apero created"})
    @ApiBadRequestResponse({description: "Validation failed"})
    async create(@Body() dto: CreateAperoDto): Promise<void> {
        return this.aperoService.create(dto);
    }

    @Delete("/:id")
    @ApiOkResponse({description: "Apero deleted"})
    @ApiBadRequestResponse({description: "Validation failed"})
    @ApiNotFoundResponse({description: "Apero not found"})
    async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        const apero = await this.aperoService.findOneByID(id);

        if (!apero) {
            throw new NotFoundException();
        }

        return this.aperoService.delete(apero);
    }

    @Patch()
    async update(@Body() dto: AperoUpdateDto) {
        const apero = await this.aperoService.findOneByID(dto.id);

        if (!apero) {
            throw new NotFoundException();
        }

        return this.aperoService.update(apero, dto);
    }

}
