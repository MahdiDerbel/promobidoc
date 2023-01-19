var Sequelize = require("sequelize");
var configuration = require("../config");
var Notebook  = require("./Notebook");
var patient  = require("./patient");
var config = configuration.connection;

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(config.base, config.root, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false,
});

// setup Root model and its fields.
var Notebook = sequelize.define(
  "notebook",
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    },

    description: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    },
    content: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    },
    id_patient: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true,
        references: {
            model: patient,
            key: "id"
        }
    },
  },
  { timestamps: false }
);
Notebook.belongsTo(patient, {as: 'patients', foreignKey: 'id_patient'});

// create all the defined tables in the specified database.
sequelize
  .sync({alter:true})
  .then(() => console.log("settings table has been successfully created, if one doesn't exist"))
  .catch((error) => console.log("This error occured", error));


// export setting model for use in other files.
module.exports = Notebook;
