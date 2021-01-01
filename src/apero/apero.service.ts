import {Injectable} from '@nestjs/common';
import Apero, {Link, Topic} from "./apero.model";
import {InjectModel} from "@nestjs/sequelize";
import {PaginatorDto} from "../dto/paginator.dto";
import CreateAperoDto from "./dto/create.dto";


@Injectable()
export class AperoService {

    constructor(
        @InjectModel(Apero) private aperoModel: typeof Apero,
        @InjectModel(Topic) private topicModel: typeof Topic
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

        for (const topic of dto.topics) {
            const topicInstance = new Topic(topic);

            await topicInstance.save();
            await apero.$add("topics", topicInstance);

            for (const link of topic.links) {
                const linkInstance = new Link(link);

                await linkInstance.save();
                await topicInstance.$add("links", linkInstance);
            }
        }
    }
}
