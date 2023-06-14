import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional} from "class-validator";
import {Transform} from "class-transformer";

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
}
export function toNumber(value){
    let newValue= Number.parseInt(value) || null
    return  newValue

}