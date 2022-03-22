import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rols extends BaseSchema {
  protected tableName = 'rol'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('rol').unique().notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}