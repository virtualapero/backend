import {Injectable} from '@nestjs/common';
import Apero, {Link, Topic} from "./apero.model";
import {InjectModel} from "@nestjs/sequelize";
import {PaginatorDto} from "../dto/paginator.dto";
import CreateAperoDto from "./dto/create.dto";
import AperoUpdateDto from "./dto/update.dto";
import {LinkDto, TopicDto} from "./dto/topic.dto";


@Injectable()
export class AperoService {

    constructor(
        @InjectModel(Apero) private aperoModel: typeof Apero,
        @InjectModel(Topic) private topicModel: typeof Topic,
        @InjectModel(Link) private linkModel: typeof Link,
    ) {
    }

    async findAll(paginator: PaginatorDto): Promise<Apero[]> {
        return this.aperoModel.findAll({
            limit: paginator.limit,
            offset: paginator.offset,
            order: [
                ["date", paginator.direction]
            ],
            include: [
                {
                    model: Topic,
                    attributes: ["id", "name", "description"],
                    include: [
                        {
                            model: Link,
                            attributes: ["id", "name", "url"]
                        }
                    ]
                }
            ]
        });
    }

    async findOneByID(id: number): Promise<Apero> {
        return this.aperoModel.findByPk(id, {
            include: [
                {
                    model: Topic,
                    attributes: ["id", "name", "description"],
                    include: [
                        {
                            model: Link,
                            attributes: ["id", "name", "url"]
                        }
                    ]
                }
            ]
        });
    }

    async create(dto: CreateAperoDto): Promise<void> {
        let apero = new Apero(dto);

        await apero.save();

        await this.createTopics(dto.topics, apero);
    }

    async delete(apero: Apero): Promise<void> {
        await this.deleteTopics(apero.topics);
        await apero.destroy();
    }

    async update(apero: Apero, dto: AperoUpdateDto): Promise<void> {
        if (dto.date) {
            apero.date = dto.date;
        }

        if (dto.member) {
            apero.member = dto.member;
        }

        await apero.save();

        if(dto.removeTopics) {
            await this.deleteTopicsById(dto.removeTopics);
        }

        if(dto.addTopics) {
            await this.createTopics(dto.addTopics, apero);
        }

        if(dto.updateTopics) {
            for (const topic of dto.updateTopics) {
                const topicInstance = await this.topicModel.findByPk(topic.id);

                if(topicInstance) {

                    if (topic.name) {
                        topicInstance.name = topic.name;
                    }

                    if (topic.description) {
                        topicInstance.description = topic.description;
                    }

                    topicInstance.save();

                    if(topic.removeLinks) {
                        await this.deleteLinksById(topic.removeLinks);
                    }

                    if(topic.addLinks) {
                        await this.createLinks(topic.addLinks, topicInstance);
                    }

                    if(topic.updateLinks) {
                        for (const link of topic.updateLinks) {
                            const linkInstance = await this.linkModel.findByPk(link.id);

                            if (linkInstance) {
                                linkInstance.name = link.name;
                                linkInstance.url = link.url;

                                await linkInstance.save();
                            }
                        }
                    }
                }
            }
        }
    }

    private async createTopics(topics: TopicDto[], apero: Apero): Promise<void> {
        for (const topic of topics) {
            const topicInstance = new Topic(topic);

            await topicInstance.save();
            await apero.$add("topics", topicInstance);

            await this.createLinks(topic.links, topicInstance);
        }
    }

    private async createLinks(links: LinkDto[], topic: Topic) {
        for (const link of links) {
            const linkInstance = new Link(link);

            await linkInstance.save();
            await topic.$add("links", linkInstance);
        }
    }

    private async deleteTopics(topics: Topic[]): Promise<void> {
        for (const topic of topics) {
            await this.deleteLinks(topic.links);
            await topic.destroy();
        }
    }

    private async deleteTopicsById(topics: number[]): Promise<void> {
        const topicObjects = await this.topicModel.findAll({
            where: {
                id: topics
            },
            include: [
                Link
            ]
        });

        await this.deleteTopics(topicObjects);
    }

    private async deleteLinks(links: Link[]): Promise<void> {
        for (const link of links) {
            await link.destroy();
        }
    }

    private async deleteLinksById(links: number[]): Promise<void> {
        const linkObjects = await this.linkModel.findAll({
            where: {
                id: links
            }
        });

        await this.deleteLinks(linkObjects);
    }
}
