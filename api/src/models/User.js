const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER,
    },

    privileges: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://www.cristobalcolon.com/fullaccess/item21334foto95108.jpg",
    },
    phone: {
      type: DataTypes.STRING,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bought: {
      type: DataTypes.INTEGER,
    },
  });
};
