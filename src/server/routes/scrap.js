import express from 'express';
const cors = require("cors");
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
const scrap = express.Router();
scrap.use(cors());

const MemberScrap = sequelize.define(
    'MemberScrap',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        SCRAP_DATE:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            primaryKey: true
        },
        recipe_code: {
            type:Sequelize.STRING,
            primaryKey: true
        }
    },{
        timestamps: false
    }
);

const Recipe = sequelize.define(
    'Recipe',
    {
        recipe_code: {
            type:Sequelize.STRING,
            primaryKey: true
        }
    },{
        timestamps: false
    }
);

const MemberJoin = sequelize.define(
    'memberJoin',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        }
    },
    {
        timestamps: false
    }
);

scrap.post('/', (req,res)=>{
    console.log("scrap post route");
    const loginUserData = {
        user_id : req.body.user_id,
    };
    const recipeData = {
        recipe_code : req.body.recipe_code
    };
    const scrapData = {
        user_id : req.body.user_id,
        recipe_code : req.body.recipe_code,
        SCRAP_DATE : req.body.SCRAP_DATE
    };
    console.log("scrap post route2");
    MemberScrap.findOne({
        where :{
            user_id : scrapData.user_id,
            recipe_code : scrapData.recipe_code
        }
    }).then((memberScrap)=>{
        if(!memberScrap){
            MemberScrap.create(scrapData)
                .then(memberScrap=>{
                    console.log("scrap create");
                    return res.json({success: true})
                })
                .catch(err=>{
                    console.log("scrap error");
                    return res.send('error' + err)
                })
        }else{
            MemberScrap.destroy({
                where:{
                    user_id : scrapData.user_id,
                    recipe_code : scrapData.recipe_code
                }
            })
                .then(memberScrap=>{
                    console.log("scrap delete");
                    return res.json({success: true})
                })
                .catch(err=>{
                    console.log("scrap error");
                    return res.send('error' + err)
                })
        }
    }).catch((err)=>{
        return res.send('error' + err);
    })
});

module.exports = scrap;