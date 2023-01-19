var Sequelize = require('sequelize');
var role  = require("./role");
var user  = require("./user");
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

// setup User model and its fields.
var equipe = sequelize.define('equipes', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_role: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        references: {
            model: role,
            key: "id"
        }
    },
    id_user: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        references: {
            model: user,
            key: "id"
        }
    },
    etat: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true, 
        defaultValue: 1 
    },
    
}, { timestamps: false }); 

equipe.belongsTo(role, {as: 'roles', foreignKey: 'id_role'});

equipe.belongsTo(user, {as: 'users', foreignKey: 'id_user'});

// create all the defined tables in the specified database.
sequelize.sync({alter:true})
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files. 
module.exports = equipe;