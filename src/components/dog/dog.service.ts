import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import Dog from "../../entities/dog.entity";
import {CreateDogDto} from "./dto/create-dog.dto";
import {DogDto} from "./dto/dog.dto";
import {InjectModel} from "@nestjs/sequelize";
import {DogsQueryDto} from "./dto/dogsQuery.dto";
import {where} from "sequelize";

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
        let options = {offset: 0, limit:2}
        if(dogQuery.pageSize && dogQuery.pageNumber){
            options.offset = dogQuery.pageSize * (dogQuery.pageNumber - 1)
            options.limit = dogQuery.pageSize
        }
        if (dogQuery.attribute && dogQuery.order) {
            options['order'] = [[dogQuery.attribute, dogQuery.order ]]
            console.log(options)
        }
        const dogs = await this.dogRepository.findAll<Dog>(options);
        const total = await this.dogRepository.count();
        return {
            dogs,
            total,
        }
    }
}
