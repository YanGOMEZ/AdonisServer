import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Libro from './Libro'

export default class Categoria extends BaseModel {
  public static table = 'categoria'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Libro,{
    foreignKey: 'id'
  })
  public libro: BelongsTo<typeof Libro>

}
