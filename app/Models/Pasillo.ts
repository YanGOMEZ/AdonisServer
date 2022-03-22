import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Ubicacion from './Ubicacion'

export default class Pasillo extends BaseModel {
  public static table = 'pasillo'

  @column({ isPrimary: true })
  public id: number

  @column()
  public pasillo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Ubicacion,{
    foreignKey: 'id'
  })
  public ubicacion: BelongsTo<typeof Ubicacion>

}
