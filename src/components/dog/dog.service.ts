import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import Dog from "../../entities/dog.entity";
import {CreateDogDto} from "./dto/create-dog.dto";
import {DogDto} from "./dto/dog.dto";
import {InjectModel} from "@nestjs/sequelize";
import {DogsQueryDto} from "./dto/dogsQuery.dto";

@Injectable()
export class DogService {
    constructor(
        @InjectModel(Dog)
        private readonly dogRepository: typeof Dog
    ) {}
    async findAll(){
        const dogs = await this.dogRepository.findAll<Dog>();
        return dogs.map(dog =>new DogDto(dog))
    }

    async getDogById(id:string){
        const dog = await this.dogRepository.findByPk<Dog>(id)
        if (!dog){
            throw new HttpException(
                `User with id ${id} not found`,
                HttpStatus.NOT_FOUND
            )
        }
        return new DogDto(dog)
    }
    async create(createDogDto: CreateDogDto){
        const dog =  await this.dogRepository.create(createDogDto)
        return new DogDto(dog)

    }

    async remove(id: string): Promise<boolean> {
        const dog = await this.dogRepository.findByPk<Dog>(id)
        await dog.destroy()
        return true
    }
    async pagination(dogQuery:DogsQueryDto){
        let paginationOptions = {offset: 0, limit:2}
        if(dogQuery.pageSize && dogQuery.pageNumber){
            paginationOptions.offset = dogQuery.pageSize * (dogQuery.pageNumber - 1)
            paginationOptions.limit = dogQuery.pageSize
        }
        const dogs = await this.dogRepository.findAll<Dog>(paginationOptions);
        const total = await this.dogRepository.count();
        return {
            dogs,
            total
        }
    }
}
