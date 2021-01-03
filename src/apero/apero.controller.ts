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
import {AperoService} from "./apero.service";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {PaginatorDto} from "../dto/paginator.dto";
import CreateAperoDto from "./dto/create.dto";
import AperoUpdateDto from "./dto/update.dto";
import {Apero, Link, Topic} from "./apero.entity";

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
        const apero = new Apero();

        apero.date = dto.date;
        apero.member = dto.member;
        apero.topics = [];

        for (const topic of dto.topics) {
            const topicInstance = new Topic();

            topicInstance.name = topic.name;
            topicInstance.description = topic.description;
            topicInstance.links = [];

            for (const link of topic.links) {
                const linkInstance = new Link();

                linkInstance.name = link.name;
                linkInstance.url = link.url;

                topicInstance.links.push(linkInstance);
            }

            apero.topics.push(topicInstance);
        }

        return this.aperoService.save(apero);
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
    @ApiOkResponse({description: "Apero updated"})
    @ApiBadRequestResponse({description: "Validation failed"})
    @ApiNotFoundResponse({description: "Apero not found"})
    async update(@Body() dto: AperoUpdateDto) {
        const apero = await this.aperoService.findOneByID(dto.id);

        if (!apero) {
            throw new NotFoundException();
        }

        if (dto.date) {
            apero.date = dto.date;
        }

        if (dto.member) {
            apero.member = dto.member;
        }

        if(dto.removeTopics) {
            for (const topic of dto.removeTopics) {
                apero.topics.splice(apero.topics.findIndex((a) => a.id === topic),1);
            }
        }

        if(dto.addTopics) {
            for (const topic of dto.addTopics) {
                const topicInstance = new Topic();

                topicInstance.name = topic.name;
                topicInstance.description = topic.description;
                topicInstance.links = [];

                for (const link of topic.links) {
                    const linkInstance = new Link();

                    linkInstance.name = link.name;
                    linkInstance.url = link.url;

                    topicInstance.links.push(linkInstance);
                }

                apero.topics.push(topicInstance);
            }
        }

        if(dto.updateTopics) {
            for (const topic of dto.updateTopics) {
                const topicInstance = apero.topics[apero.topics.findIndex(a => a.id === topic.id)];

                if(topicInstance) {

                    if (topic.name) {
                        topicInstance.name = topic.name;
                    }

                    if (topic.description) {
                        topicInstance.description = topic.description;
                    }

                    if(topic.removeLinks) {
                        for (const link of topic.removeLinks) {
                            topicInstance.links.splice(topicInstance.links.findIndex((a) => a.id === link), 1);
                        }
                    }

                    if(topic.addLinks) {
                        for (const link of topic.addLinks) {
                            const linkInstance = new Link();

                            linkInstance.name = link.name;
                            linkInstance.url = link.url;

                            topicInstance.links.push(linkInstance);
                        }
                    }

                    if(topic.updateLinks) {
                        for (const link of topic.updateLinks) {
                            const linkInstance = topicInstance.links[topicInstance.links.findIndex(a => a.id === link.id)];

                            if (linkInstance) {
                                if(link.name) {
                                    linkInstance.name = link.name;
                                }

                                if(link.url) {
                                    linkInstance.url = link.url;
                                }
                            }
                        }
                    }
                }
            }

        }

        await this.aperoService.save(apero);
    }

}
