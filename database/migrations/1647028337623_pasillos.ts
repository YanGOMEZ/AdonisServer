import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pasillos extends BaseSchema {
  protected tableName = 'pasillo'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('pasillo').notNullable().unique()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
