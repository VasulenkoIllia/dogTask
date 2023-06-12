import {ApiProperty} from "@nestjs/swagger";
import Dog from "../../../entities/dog.entity";

export class DogDto{
    @ApiProperty()
    readonly id: string

    @ApiProperty()
    readonly name: string

    @ApiProperty()
    readonly color: string

    @ApiProperty()
    readonly tail_length: number

    @ApiProperty()
    readonly weight: number
    constructor(dog: Dog) {
        this.id = dog.id
        this.name = dog.name
        this.color = dog.color
        this.tail_length = dog.tail_length
        this.weight = dog.weight
    }
}