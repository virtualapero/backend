import {Injectable} from '@nestjs/common';
import {PaginatorDto} from "../dto/paginator.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Apero, Link, Topic} from "./apero.entity";


@Injectable()
export class AperoService {

    constructor(
        @InjectRepository(Apero) private aperoRepository: Repository<Apero>,
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
        @InjectRepository(Link) private linkRepository: Repository<Link>,
    ) {}

    async findAll(paginator: PaginatorDto): Promise<Apero[]> {
        return this.aperoRepository.find({
            relations: [
                "topics",
                "topics.links"
            ],
            order: {
                date: paginator.direction
            },
            skip: paginator.offset,
            take: paginator.limit
        });
    }

    async findOneByID(id: number): Promise<Apero> {
        return this.aperoRepository.findOne(id, {
            relations: [
                "topics",
                "topics.links"
            ]
        })
    }

    async delete(apero: Apero): Promise<void> {
        await this.aperoRepository.remove(apero);
    }

    async save(apero: Apero): Promise<void> {
        await this.aperoRepository.save(apero)
    }

}
