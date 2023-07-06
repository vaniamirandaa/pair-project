'use strict';

let data = require('../schedule.json')

 data.forEach((e)=>{
  delete e.id
  e.createdAt = new Date()
  e.updatedAt = new Date()
 })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedules', data, {})

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
