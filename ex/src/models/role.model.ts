import {Table, Column, AllowNull, AutoIncrement, PrimaryKey, Model, DataType, BelongsToMany} from 'sequelize-typescript'
import User from './user.model'
import UserRole from './userrole.model'

@Table
export default class Role extends Model{
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!:number

    @AllowNull(false)
    @Column(DataType.STRING)
    name!:string

    @BelongsToMany(()=>User,()=>UserRole)
    users!:User[]

}
