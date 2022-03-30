import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Detalles extends BaseSchema {
  protected tableName = 'detalles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('ganador').unsigned().references('id').inTable('usuarios')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
