import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Detalle extends BaseModel {

  public static table = 'detalles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public partida: number

  @column()
  public ganador: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
