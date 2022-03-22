import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Libro from './Libro'
import usuario from './usuario'

export default class Prestamo extends BaseModel {

  public static table = 'prestamos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public libro: number

  @column()
  public cliente:number

  @column()
  public Fecha_Entrega: Date

  @column()
  public Entregado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Libro,{
    localKey: 'libro'
  })
  public libros: HasOne<typeof Libro>

  @hasOne(() => usuario,{
    localKey: 'cliente'
  })
  public clientes: HasOne<typeof usuario>

}
