import {Table, Column, AllowNull, AutoIncrement, PrimaryKey, Model, DataType, ForeignKey} from 'sequelize-typescript'
import User from './user.model'
import Role from './role.model'

@Table
export default class UserRole extends Model{

    @ForeignKey(()=>User)
    @Column
    userId!:number
    
    @ForeignKey(()=>Role)
    @Column
    roleId!:number    
}

