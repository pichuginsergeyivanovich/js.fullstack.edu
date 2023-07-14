import {Table, Column, AllowNull, AutoIncrement, PrimaryKey, Model, DataType, BelongsToMany, Default, ForeignKey} from 'sequelize-typescript'
import User from './user.model'

@Table
export default class Project extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!:number

    @Column(DataType.STRING)
    name!:string

    @Column(DataType.STRING)
    description!:string

    @ForeignKey(()=>User)
    @Column
    userId!:number //author

}