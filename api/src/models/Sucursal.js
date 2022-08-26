const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Sucursal", {
    name: {
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

  });
};
