import {IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LinkDto, TopicDto} from "./topic.dto";
import {ApiProperty} from "@nestjs/swagger";

export class LinkUpdateDto extends LinkDto{

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id: number;

}

export class TopicUpdateDto {

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({required: false, type: [LinkDto]})
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => LinkDto)
    addLinks: LinkDto[];

    @ApiProperty({required: false, type: [Number]})
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    removeLinks: number[]

    @ApiProperty({required: false, type: [LinkUpdateDto]})
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => LinkUpdateDto)
    updateLinks: LinkUpdateDto[];

}

export default class AperoUpdateDto {

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ApiProperty({required: false, format: "date"})
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    member: number;

    @ApiProperty({required: false, type: [TopicDto]})
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TopicDto)
    addTopics: TopicDto[];

    @ApiProperty({required: false, type: [Number]})
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    removeTopics: number[]

    @ApiProperty({required: false, type: [TopicUpdateDto]})
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TopicUpdateDto)
    updateTopics: TopicUpdateDto[];

}