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
    // showStatus(){
    //   if(this.seatNumber === 0){
    //     return "Sold Out!"
    //   } 
      
    // }
  }
  Schedule.init({
    departure: {
      type: DataTypes.DATE,
      validate: {
        isNotInPast(value) {
          const now = new Date();
          if (value.getTime() < now.getTime()) {
            throw new Error('Departure date cannot be in the past!');
          }
        }
      }
    },    
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    price: DataTypes.INTEGER,
    seatNumber: DataTypes.INTEGER,
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

  Schedule.beforeValidate((schedule, origins) => {
    if (schedule.origin) {
      schedule.origin = schedule.origin[0].toUpperCase() + schedule.origin.slice(1).toLowerCase();
  }
  if (schedule.destination) {
      schedule.destination = schedule.destination[0].toUpperCase() + schedule.destination.slice(1).toLowerCase();
  }
  })


  return Schedule;
};