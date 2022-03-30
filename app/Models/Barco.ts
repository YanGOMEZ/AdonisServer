import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Barco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public partida: number

  @column()
  public jugador: number

  @column()
  public barco: number

  @column()
  public posicion: string

  @column()
  public derribado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
