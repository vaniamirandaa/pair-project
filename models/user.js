'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.TravelAgent)
      User.hasOne(models.Profile)
      User.hasOne(models.Itinerary)

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
              msg: 'Email is required!'
          },
          isEmail: {
              msg: 'Email is not valid!'
          }
      }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: {
            msg: 'Password is required'
        },
        len: {
            args: [8, Infinity],
            msg: 'Password must be at least 8 characters long'
        }
    }
},
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });
  return User;

};