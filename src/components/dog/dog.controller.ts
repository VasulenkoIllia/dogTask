import {Body, Controller, Delete, Get, Param, Post, Query, Req, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {DogService} from "./dog.service";
import {CreateDogDto} from "./dto/create-dog.dto";
import {DogDto} from "./dto/dog.dto";
import {DogsQueryDto} from "./dto/dogsQuery.dto";

@Controller('dogs')
@ApiTags('dogs')
export class DogController {
    constructor(private readonly dogService: DogService) {}


    @Post('create')
    create(
        @Body() createDogDto: CreateDogDto):Promise<CreateDogDto>{
        return this.dogService.create(createDogDto)
    }
    // @Get()
    // findAll(): Promise<DogDto[]>{
    //     return this.dogService.findAll()
    // }
    @Get()
    findAll(@Query() dogQuery:DogsQueryDto, ): Promise<{ dogs:DogDto[] }>{
        return this.dogService.findAll(dogQuery)
    }


    @Get(':id')
    findById(@Param('id')id: string): Promise<DogDto>{
        return this.dogService.getDogById(id)
    }
    @Delete(':id')
    delete(@Param('id') id:string ):Promise<boolean>{
        return this.dogService.remove(id)
    }
}
