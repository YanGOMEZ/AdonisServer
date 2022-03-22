import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Librogeneros extends BaseSchema {
  protected tableName = 'librogenero'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('libro').unsigned().references('id').inTable('libro').notNullable()
      table.integer('genero').unsigned().references('id').inTable('genero').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
