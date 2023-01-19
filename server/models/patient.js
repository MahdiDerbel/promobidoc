var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var configuration = require("../config")
var config = configuration.connection;
	
// create a sequelize instance with our local postgres database information. 
const sequelize = new Sequelize(config.base, config.root, config.password, {
	host:config.host,
	port: config.port,
	dialect:'mysql',
	pool:{
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}, 
	operatorsAliases: false
});

// setup Patient model and its fields.
var Patient = sequelize.define('patients', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
	nom_prenom: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
	gender: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true
    },
	email: {
        type: Sequelize.STRING, 
        unique: false,
        allowNull: true
    },
	tel: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    age: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
    },  
    weight: {
        type: Sequelize.FLOAT,
        unique: false,
        allowNull: true,
    },
    height: {
        type: Sequelize.FLOAT,
        unique: false,
        allowNull: true,
    },  
    description: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
    },
  
    
}, { timestamps: false }); 


// create all the defined tables in the specified database.
sequelize.sync({alter:true})
    .then(() => console.log('patients table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export Patient model for use in other files. 
module.exports = Patient;