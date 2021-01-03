import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsString, IsUrl, MaxLength, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class LinkDto {

    @ApiProperty({maxLength: 250})
    @IsString()
    @MaxLength(250)
    name: string;

    @ApiProperty({format: "url"})
    @IsUrl()
    url: string;

}

export class TopicDto {

    @ApiProperty({maxLength: 250})
    @IsString()
    @MaxLength(250)
    name: string;

    @ApiProperty({maxLength: 16777000})
    @IsString()
    @MaxLength(16777000)
    description: string;

    @ApiProperty({type: [LinkDto]})
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => LinkDto)
    links: LinkDto[];

}