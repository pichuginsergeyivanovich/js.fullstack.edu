import {Table, Column, AllowNull, AutoIncrement, PrimaryKey, Model, DataType, BelongsToMany, Default, ForeignKey} from 'sequelize-typescript'
import User from './user.model'
import Project from './project.model'

@Table
export default class Repository extends Model{
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
    userId!:number

    @ForeignKey(()=>Project)
    @Column
    projectId!:number
}