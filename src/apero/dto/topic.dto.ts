import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDate, IsNumber, IsOptional, IsString, IsUrl, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class LinkDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsUrl()
    url: string;

}

export class TopicDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty({type: [LinkDto]})
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => LinkDto)
    links: LinkDto[];

}