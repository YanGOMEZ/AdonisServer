import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ubicacions extends BaseSchema {
  protected tableName = 'ubicacion'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('pasillo').unsigned().references('id').inTable('pasillo').notNullable()
      table.integer('estante').unsigned().references('id').inTable('estante').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
