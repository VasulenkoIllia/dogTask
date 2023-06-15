import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {HttpException, HttpStatus} from "@nestjs/common";

export class DogsQueryDto{
    @ApiProperty()
    @ApiPropertyOptional()
    @Transform(
        ({value})=>{
            return toNumber(value)
        }
    )
    @IsOptional()
     pageNumber: number

    @ApiProperty()
    @ApiPropertyOptional()
    @Transform(
    ({value})=>{
        return toNumber(value)
    }
    )
    @IsOptional()
     pageSize:number

    @ApiProperty({enum:[
            "name","color","tail_length","weight","createdAt"
        ]})
    @ApiPropertyOptional()
    @Transform(
        ({value})=>{
            return attributePossible(value)
        })
    @IsString()
    @IsOptional()
    attribute:string

    @ApiProperty({enum:[
        "desc","asc"
        ]})
    @ApiPropertyOptional()
    @Transform(
        ({value})=>{
            return orderPossible(value)
        })
    @IsString()
    @IsOptional()
    order:string

}
export function toNumber(value){
    let newValue= Number.parseInt(value) || null
    return  newValue
}
export function orderPossible(value){
    const orderPossible = ["desc","asc"]
    if ( orderPossible.includes(value)){
        return value
    }
    else
        throw new HttpException(
            `invalid value ${value} of order`,
            HttpStatus.NOT_FOUND
        )
}

export function attributePossible(value){
    const attributePossible = ["name","color","tail_length","weight","createdAt"]
    if ( attributePossible.includes(value)){
        return value
    }
    else
        throw new HttpException(
            `invalid value ${value} of attribute`,
            HttpStatus.NOT_FOUND
        )
}