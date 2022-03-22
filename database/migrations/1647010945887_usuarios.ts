import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsuariosSchema extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('nombre',50).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('rol').unsigned().references('id').inTable('rol').notNullable().defaultTo(2)
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
