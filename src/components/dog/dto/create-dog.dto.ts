import {ApiProperty} from "@nestjs/swagger";
import {Length, IsString, IsInt, Min, IsNotEmpty, validate, isValidationOptions,} from 'class-validator';
import { Unique} from "sequelize-typescript";

export class CreateDogDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    readonly color: string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(10,{
        message: 'is not a number',
    } )
    readonly tail_length: number


    @ApiProperty()
    @IsNotEmpty()
    readonly weight: number
}