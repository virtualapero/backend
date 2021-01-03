import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("apero")
export class Apero {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column("date")
    date: Date;

    @ApiProperty()
    @Column()
    member: number; //TODO Placeholder!

    @ApiProperty({type: () => [Topic]})
    @OneToMany(() => Topic, topic => topic.apero, { cascade: true })
    topics: Topic[];

}

@Entity("apero_topic")
export class Topic {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column("mediumtext")
    description: string;

    @ApiProperty({type: () => [Link]})
    @OneToMany(() => Link, link => link.topic, { cascade: true })
    links: Link[];

    @ManyToOne(() => Apero, apero => apero.topics, { onDelete: "CASCADE"})
    apero: Apero;

}

@Entity("apero_link")
export class Link {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column("varchar", {length: 2083})
    url: string;

    @ManyToOne(() => Topic, topic => topic.links, { onDelete: "CASCADE" })
    topic: Topic;

}