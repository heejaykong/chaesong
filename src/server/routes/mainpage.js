const express = require("express");
const MainPages = express.Router();
const session = require("express-session");
const cors = require("cors");
const Sequelize = require("sequelize");

MainPages.use(cors());

const sequelize = new Sequelize('chaesongdb', 'comhong', 'sook2019', {
        host: "chaesong.cccteklwfdo9.ap-northeast-2.rds.amazonaws.com",
        dialect: 'mysql',
        operatorsAliases: false,
        pool:{
            max:5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const MemberEat = sequelize.define(
    'MemberEat',
    {
        recipe_code:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.STRING
        }
    }
);

const Recipes = sequelize.define(
    'Recipe',
    {
        recipe_code: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        recipe_name: {
            type:Sequelize.STRING
        },
        ENERGY: {
            type:Sequelize.DOUBLE
        },
        PROCPN: {
            type: Sequelize.DOUBLE
        }
    }
);



module.exports = MainPages;