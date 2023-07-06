'use strict';
 let data = require('../travelagent.json')

 data.forEach((e)=>{
  delete e.id
  e.createdAt = new Date()
  e.updatedAt = new Date()
 })
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TravelAgents', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TravelAgents', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
