"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      complete: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

module.exports = function (sequelize, DataTypes) {
  var Todo = sequelize.define(
    "Todo",
    {
      title: DataTypes.STRING,
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      classMethods: {
        associate: function (models) {
          Todo.belongsTo(models.User);
        },
      },
    }
  );
  return Todo;
};
