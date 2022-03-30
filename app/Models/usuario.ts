import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Rol'
//import Prestamo from './Prestamo'

export default class usuario extends BaseModel {

  public static table = 'usuarios'

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public nombre: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rol: number

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Rol,{
    localKey:'rol'
  })
  public rols: HasOne<typeof Rol>

  @beforeSave()
  public static async hashPassword (usuario: usuario) {
    if (usuario.$dirty.password) {
      usuario.password = await Hash.make(usuario.password)
    }
  }

  /* @belongsTo(() => Prestamo,{
    foreignKey: 'id'
  })
  public prestamo: BelongsTo<typeof Prestamo> */

}
