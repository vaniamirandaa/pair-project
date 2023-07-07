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

    },
    lastName: {
      type: DataTypes.STRING,

    },
    
    dateOfBirth: {
        type: DataTypes.DATE,
        validate: {
        
            isOver13(value) {
              const today = new Date();
              const birthYear = new Date(value);
              const age = today.getFullYear() - birthYear.getFullYear();
              if (age < 13) {
                  throw new Error('You must be over 13 years old!');
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
  Profile.beforeValidate((profile, origins) => {
    if (profile.firstName) {
      profile.firstName = profile.firstName[0].toUpperCase() + profile.firstName.slice(1).toLowerCase();
  }
  if (profile.lastName) {
      profile.lastName = profile.lastName[0].toUpperCase() + profile.lastName.slice(1).toLowerCase();
  }
if (profile.address) {
  profile.address = profile.address[0].toUpperCase() + profile.address.slice(1).toLowerCase();
}
  })

  return Profile;
};