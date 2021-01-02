import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({timestamps: false})
export default class Apero extends Model<Apero> {

    @ApiProperty()
    id: number;

    @Column(DataType.DATEONLY)
    @ApiProperty({format: "date"})
    date: Date;

    @Column
    @ApiProperty({description: "Placeholder!"})
    member: number; //TODO Placeholder

    @HasMany(() => Topic)
    @ApiProperty({type: () => [Topic]})
    topics: Topic[];

}

@Table({timestamps: false})
export class Topic extends Model<Topic> {

    @ApiProperty()
    id: number;

    @Column
    @ApiProperty()
    name: string;

    @Column
    @ApiProperty()
    description: string;

    @HasMany(() => Link)
    @ApiProperty({type: () => [Link]})
    links: Link[];

    @ForeignKey(() => Apero)
    aperoId: number

}

@Table({timestamps: false})
export class Link extends Model<Link> {

    @ApiProperty()
    id: number;

    @Column
    @ApiProperty()
    name: string;

    @Column
    @ApiProperty()
    url: string;

    @ForeignKey(() => Topic)
    topicId: number

}