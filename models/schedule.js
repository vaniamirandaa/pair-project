'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.TravelAgent)
    }
  }
  Schedule.init({
    departure: DataTypes.TIME,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    TravelAgentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'TravelAgents',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};