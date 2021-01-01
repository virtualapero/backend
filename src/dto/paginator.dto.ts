import {IsEnum, IsNumber, IsPositive, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export enum Direction {
    ASCENDING = "ASC",
    DESCENDING = "DESC"
}

export class PaginatorDto {

    @ApiProperty({required: false, minimum: 1})
    @IsNumber()
    @IsPositive()
    @Max(100)
    @Type(() => Number)
    limit: number = 10;

    @ApiProperty({required: false, minimum: 0})
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    offset: number = 0;

    @ApiProperty({enum: ["ASC", "DESC"], enumName: "Direction", required: false})
    @IsEnum(Direction)
    direction: Direction = Direction.ASCENDING;
}