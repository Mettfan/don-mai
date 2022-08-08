const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Product", {
    Código: {
      type: DataTypes.STRING,
    },
    Producto: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },

    ['P. Venta']: {
      type: DataTypes.STRING,
    },

    discount: {
      type: DataTypes.INTEGER,
    },

    image: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://www.cristobalcolon.com/fullaccess/item21334foto95108.jpg",
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    brand: {
      type: DataTypes.STRING,
    },
    Departamento: {
      type: DataTypes.STRING,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sales: {
      type: DataTypes.INTEGER,
    },

  });
};
