import {ApiProperty} from "@nestjs/swagger";
import {
    Length,
    IsString,
    IsInt,
    Min,
    IsNotEmpty,
    validate,
    isValidationOptions,
    IsNumber,
    Max,
    MAX,
} from 'class-validator';

export class CreateDogDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 60)
    readonly color: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0 )
    readonly tail_length: number


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0 )
    readonly weight: number
}