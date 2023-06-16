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
    async getDogById(id:string):Promise<DogDto>{
        const dog = await this.dogRepository.findByPk<Dog>(id)
        if (!dog){
            throw new HttpException(
                `Dog with id ${id} not found`,
                HttpStatus.NOT_FOUND
            )
        }
        return new DogDto(dog)
    }
    async create(createDogDto: CreateDogDto):Promise<DogDto>{
        try {
            const dog =  await this.dogRepository.create(createDogDto)
            return new DogDto(dog)
        }
        catch {
           throw new HttpException(
                `Dog with name ${createDogDto.name} already exists`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async remove(id: string): Promise<boolean> {
        try {
            const dog = await this.dogRepository.findByPk<Dog>(id)
            await dog.destroy()
            return true
        }
        catch {
            throw new HttpException(
                `Dog with id ${id} not found`,
                HttpStatus.NOT_FOUND
            )
        }
    }
    async findAll(dogQuery:DogsQueryDto):Promise<{dogs:DogDto[],total: number}>{
        let options = {offset: 0, limit:2}
        if(dogQuery.pageSize && dogQuery.pageNumber){
            options.offset = dogQuery.pageSize * (dogQuery.pageNumber - 1)
            options.limit = dogQuery.pageSize
        }
        if (dogQuery.attribute) {
            options['order'] = [[dogQuery.attribute, dogQuery.order || 'asc' ]]
        }
        const dogs:Dog[] = await this.dogRepository.findAll<Dog>(options);
        const total:number = await this.dogRepository.count();
        return {
            dogs,
            total,
        }
    }
}
