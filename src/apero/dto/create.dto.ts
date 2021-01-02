import {IsArray, IsDate, IsNumber, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {TopicDto} from "./topic.dto";
import {ApiProperty} from "@nestjs/swagger";

export default class CreateAperoDto {

    @ApiProperty({format: "date"})
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty()
    @IsNumber()
    member: number; //TODO Placeholder

    @ApiProperty({type: [TopicDto]})
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TopicDto)
    topics: TopicDto[];

}