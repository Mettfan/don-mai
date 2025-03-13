const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Ticket", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Productos: {
      type: DataTypes.JSON,
    },
    Total: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    user: {
        type: DataTypes.STRING
    },
    client: {
        type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    sendAddress: {
      type: DataTypes.STRING
    },
    payment_id: {
      type: DataTypes.STRING,
      defaultValue: null
    }

    

  });
};
