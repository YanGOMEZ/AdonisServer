import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Libro from './Libro'
import Genero from './Genero'

export default class Librogenero extends BaseModel {

  public static table = 'librogenero'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public libro: number

  @column()
  public genero: number

  @hasOne(() => Libro,{
    localKey: 'libro'
  })
  public libros: HasOne<typeof Libro>

  @hasOne(() => Genero,{
    localKey: 'genero'
  })
  public generos: HasOne<typeof Genero>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
