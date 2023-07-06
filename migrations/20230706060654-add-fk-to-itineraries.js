'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Itineraries', 'UserId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }  
    });
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Itineraries', 'UserId');
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  }
};
