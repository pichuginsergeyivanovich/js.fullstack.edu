import {Table, Column, AllowNull, AutoIncrement, PrimaryKey, Model, DataType, BelongsToMany, Default} from 'sequelize-typescript'
import Role from './role.model'
import UserRole from './userrole.model'

export enum UserRoles{
    USER = "USER",
    ADMIN = "ADMIN"
}
@Table
export default class User extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!:number

    @Column(DataType.STRING)
    email!:string

    @Column(DataType.STRING)
    password!:string

    @Column(DataType.STRING)
    firstname!:string

    @Column(DataType.STRING)
    lastname!:string

    @Column(DataType.STRING)
    pname!:string

    @Column(DataType.STRING)
    university!:string

    @BelongsToMany(()=>Role,()=>UserRole)
    roles!:Role[]
}