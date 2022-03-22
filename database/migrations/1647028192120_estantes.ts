import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Estantes extends BaseSchema {
  protected tableName = 'estante'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('estante',5).notNullable().unique()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
