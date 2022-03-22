import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Librogenero from './Librogenero'

export default class Genero extends BaseModel {
  public static table = 'genero'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Librogenero,{
    foreignKey: 'id'
  })
  public librogenero: BelongsTo<typeof Librogenero>

}
