import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Editorial from './Editorial'
import Categoria from './Categoria'
import Autor from './Autor'
import Ubicacion from './Ubicacion'
import Librogenero from './Librogenero'
import Prestamo from './Prestamo'

export default class Libro extends BaseModel {

  public static table = 'libro'

  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public sinopsis: string

  @column()
  public portada: string

  @column()
  public stock: number

  @column()
  public editorial: number

  @column()
  public categoria: number

  @column()
  public autor: number

  @column()
  public ubicacion: number

  @hasOne(() => Editorial,{
    localKey: 'editorial'
  })
  public editoriales: HasOne<typeof Editorial>

  @hasOne(() => Categoria,{
    localKey: 'categoria'
  })
  public categorias: HasOne<typeof Categoria>

  @hasOne(() => Autor,{
    localKey: 'autor'
  })
  public autores: HasOne<typeof Autor>

  @hasOne(() => Ubicacion,{
    localKey: 'ubicacion'
  })
  public ubicaciones: HasOne<typeof Ubicacion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Librogenero,{
    foreignKey: 'id'
  })
  public librogenero: BelongsTo<typeof Librogenero>

  @belongsTo(() => Prestamo,{
    foreignKey: 'id'
  })
  public prestamo: BelongsTo<typeof Prestamo>

}
