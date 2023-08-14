import {Table, Column, AllowNull, AutoIncrement, PrimaryKey, Model, DataType, BelongsToMany, Default, ForeignKey} from 'sequelize-typescript'
import User from './user.model'

@Table
export default class SshKey extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!:number

    @Column(DataType.STRING)
    name!:string

    @Column(DataType.TEXT)
    key!:string

    @ForeignKey(()=>User)
    @Column
    userId!:number 

}