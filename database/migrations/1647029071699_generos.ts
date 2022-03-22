import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Generos extends BaseSchema {
  protected tableName = 'genero'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('nombre',50).notNullable().unique()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
