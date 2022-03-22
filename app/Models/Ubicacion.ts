import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Estante from './Estante'
import Pasillo from './Pasillo'
import Libro from './Libro'

export default class Ubicacion extends BaseModel {
  public static table = 'ubicacion'

  @column({ isPrimary: true })
  public id: number

  @column()
  public pasillo: number

  @column()
  public estante:number

  @hasOne(() => Pasillo,{
    localKey: 'pasillo'
  })
  public pasillos: HasOne<typeof Pasillo>

  @hasOne(() => Estante,{
    localKey: 'estante'
  })
  public estantes: HasOne<typeof Estante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Libro,{
    foreignKey: 'id'
  })
  public libro: BelongsTo<typeof Libro>

}
