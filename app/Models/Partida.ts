import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Partida extends BaseModel {

  public static table = 'partidas'

  @column({ isPrimary: true })
  public id: number

  @column()
  public jugador1: number

  @column()
  public jugador2: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
