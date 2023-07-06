'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    //  welcomeMsg(){
    //   return `Welcome ${this.firstName}`
    //  }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name cannot be null.'
        }
      },
      notEmpty: {
        msg: 'First name cannot be empty.'
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name cannot be null.'
        },
      },
      notEmpty: {
        msg: 'Last name cannot be empty.'
      }
    },
    
    dateOfBirth: {
        type: DataTypes.DATE,
        validate: {
          args: {
            isOver13(value) {
              const today = new Date();
              const birthYear = new Date(value);
              const age = today.getFullYear() - birthYear.getFullYear();
              if (age < 13) {
                  throw new Error('You must be over 13 years old!');
              }
          }
          },
    
        }
    },
    phoneNumber: DataTypes.NUMBER,
    address: DataTypes.TEXT,
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'Id'
        }
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};