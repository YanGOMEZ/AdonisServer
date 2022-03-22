import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import usuario from './usuario'

export default class Rol extends BaseModel {

  public static table = 'rol'

  @column({ isPrimary: true })
  public id: number

  @column()
  public rol: string

  @belongsTo(() => usuario,{
    foreignKey: 'id'
  })
  public usuarios: BelongsTo<typeof usuario>

}
