import {Column, DataType, Table, Unique,Model} from "sequelize-typescript";



@Table({
    tableName: 'dog',
})
export default class Dog extends Model<Dog>{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string

    @Unique
    @Column
    name: string

    @Column
    color: string

    @Column
    tail_length: number


    @Column
    weight: number

}
