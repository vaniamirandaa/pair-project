'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Itinerary.belongsTo(models.User)
      Itinerary.belongsTo(models.Schedule)

    }

    static getStatus() {
      return [
        { value: 'ongoing', label: 'In Progress' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Completed' }
      ];
    }
  }
  
  Itinerary.init({
    departure: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Itinerary',
  });
  return Itinerary;
};