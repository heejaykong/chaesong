const express = require("express");
const router = express.Router();
const cors = require("cors");
const Sequelize = require("sequelize");
const session = require("express-session");

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
const MemberLogin = sequelize.define(
    'memberJoins',
    {
        user_id: {
            type:Sequelize.STRING,
            primaryKey: true
        },
        pw:{
            type: Sequelize.STRING
        },
        vegantype:{
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
);

router.use(cors());

router.post('/signin', (req, res)=> {

    const loginUserData = {
        user_id : req.body.user_id,
        pw : req.body.pw
    };

    let vegantype = "";

    MemberLogin.findOne({where:{user_id : req.body.user_id}})
        .then(memberLogin => {
            if(!memberLogin){
                return res.status(401).json({
                    error: "There is no user",
                    code:2
                });
            }

            switch (memberLogin.vegantype) {
                case 1:
                    vegantype = "페스코 베지테리언";
                    break;
                case 2:
                    vegantype = "락토 오보 베지테리언";
                   break;
                case 3:
                    vegantype = "오보 베지테리언";
                    break;
                case 4:
                    vegantype = "락토 베지테리언";
                    break;
                case 5:
                    vegantype = "비건";
                    break;
                default:
                    console.log("case error");
                    break;
            }

            console.log(vegantype);


            if(req.body.pw === memberLogin.pw){
                let session = req.session;
                session.loginInfo ={
                    _id : memberLogin.user_id,
                    user_id: memberLogin.user_id
                };
                res.cookie("member", req.body.user_id,{
                    expires: new Date(Date.now() + 900000)
                }); // 지워도 괜찮은 코드
                res.cookie("vegantype", vegantype,{
                    expires: new Date(Date.now() + 900000)
                });
                return res.json({
                    success: true
                });
            }else{
                return res.status(401).json({
                    error: "password is not correct",
                    code : 3
                });
            }
        });
});

router.get('/getinfo',(req,res)=>{
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: "THERE IS NO LOGIN DATA",
            code: 1
        });
    }
    res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res)=>{
    let session = req.session;
    console.log(req.session);
    session.destroy(function(){
        req.session;
    });
    console.log(req.session);
    return res.json({success: true});
});

module.exports = router;