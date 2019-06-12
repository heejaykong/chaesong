//크롤링 띄우기 위한 test code
import express from 'express';

const Sequelize = require("sequelize");
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
const vegekeyword = express.Router();
const VegeKeyword = sequelize.define('VegeKeyword', {
    // attributes
    date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    keyword: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    indexes: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
});
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) { dd = '0' + dd; }
if (mm < 10) { mm = '0' + mm; }
let today_formatted = yyyy + '-' + mm + '-' + dd;

vegekeyword.get('/', (req,res) => {
    console.log("vegekeyword routes");
    VegeKeyword.findAll({
        where: {
            date: today_formatted // SELECT * FROM VegeKeyword WHERE date = today_formatted;
        }
    }).then(vegekeywords => {
            return res.json(vegekeywords)
        })
        .catch(err=>{
            return res.send('error' + err)
        })
});

module.exports = vegekeyword;
//end
