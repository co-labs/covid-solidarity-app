'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchesSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments();
      table.string('phone', 60).nullable();
      table.string('name', 60).nullable();
      table.text('detail').nullable();
      table.string('email', 60).nullable();
      table.string('type', 60).nullable();
      table.string('status', 60).nullable();
      table.integer('sender_id').unsigned().references('id').inTable('users');
      table.integer('recipient_id').unsigned().references('id').inTable('users');
      table.string('address', 60).nullable();
      table.string('lat', 60).nullable();
      table.string('lng', 60).nullable();
      table.string('transaction_id', 256).nullable();
      table.string('transaction_type', 60).nullable();
      table.string('transaction_status', 60).nullable();
      table.string('transaction_link', 60).nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('matches');
  }
}

module.exports = MatchesSchema;
