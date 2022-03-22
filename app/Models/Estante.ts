import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Ubicacion from './Ubicacion'

export default class Estante extends BaseModel {
  public static table = 'estante'

  @column({ isPrimary: true })
  public id: number

  @column()
  public estante: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Ubicacion,{
    foreignKey: 'id'
  })
  public ubicacion: BelongsTo<typeof Ubicacion>

}
