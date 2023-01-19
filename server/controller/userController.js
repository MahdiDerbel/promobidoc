const express = require("express");
const router = express.Router();
var roles = require("../models/role");
var user = require("../models/user");
const jwt = require("jsonwebtoken");
const privateKey = "mySecretKeyabs";
var bcrypt = require('bcrypt');
const auth = require("../middlewares/passport");
const { Op } = require("sequelize");

router.post("/updateProfile", (req, res) => {
  var id = req.body.id;
    user.findOne({ where: { id: id } }).then(function (r1) {
      if (!r1) {
        return res.status(403).send(false);
      } else {
        var password="";
        if(req.body.password==""){password=r1.password;}
        else{	const salt = bcrypt.genSaltSync();
          password = bcrypt.hashSync(req.body.password, salt);}
        user.update(
            {
              nom_prenom: req.body.nom,
              login: req.body.login,
              tel: req.body.tel,
              password: password,
              etat: 1,
            },
            { where: { id: id } }
          )
          .then((u2) => {
            return res.status(200).send(true);
          })
          .catch((error) => {
            return res.status(403).send(false);
          });
       }
    });
 
});
router.post("/addUser", (req, res) => {
  var id = req.body.id;
  user.findOne({ where: { login: req.body.login,id:{[Op.ne]:id }} }).then(function (r1) {
    if(!r1 || r1.login != req.body.login )
    {
      if (id == 0) {
      user.create({
          nom_prenom: req.body.nom,
          login: req.body.login,
          email: req.body.email,
          tel: req.body.tel,
          id_role: req.body.role,
          password: req.body.password,
          etat: 1,
        })
        .then((u) => {
          if(req.body.role==5){
          req.body.typeSelect.forEach((element) => {
            userType.create({
              id_user: u.id,
              id_type: element.value,
            });
          });}
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(400).send(false);
        });
      } else  {
        user.findOne({ where: { id: id } }).then(function (r1) {
          if (!r1) {
            return res.status(400).send(false);
          } else {
            var password="";
            if(req.body.password==""){password=r1.password;}
            else{	const salt = bcrypt.genSaltSync();
              password = bcrypt.hashSync(req.body.password, salt);}
            user.update(
                {
                  nom_prenom: req.body.nom,
                  login: req.body.login,
                  email: req.body.email,
                  tel: req.body.tel,
                  id_role: req.body.role,
                  password: req.body.password,
                  etat: 1,
                },
                { where: { id: id } }
              )
              .then((u) => {
                if(req.body.role==5)
                 { userType.destroy({
                      where: { id_user: id },
                    })
                    .then((doc) => {
                        req.body.typeSelect.forEach((element) => {
                          userType.create({
                            id_user: id,
                            id_type: element.value,
                          });
                        });
                    });}
                return res.status(200).send(true);
              })
              .catch((error) => {
                return res.status(400).send(false);
              });
          }
        });
      }
    } else {
      return res.status(403).send(false);
    }

  })
});
router.put("/changeEtat/:id", (req, res) => {
  var id = req.params.id;
  user.findOne({ where: { id: id } }).then(function (u) {
    var etat = 0;
    if(u.dataValues.etat == 0)
      etat = 1;
    if (!u) {
      return res.status(403).send(false);
    } else {
      user.update({
          etat: etat
        },{ where: { id: id } })
        .then((r2) => {
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(403).send(false);
        });
    }
  });
});
router.post("/allUser",auth, (req, res) => {
  user.findAll({
      include: ["roles"],
      order:[["id","desc"]]
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});
router.post("/getActive",auth, (req, res) => {
  user.findAll({
      where:{etat:1},
      include: ["roles"],
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});

//Delete client
router.delete("/deleteUser/:id", (req, res) => {
  var id = req.params.id;
  user.findOne({ where: { id: id } }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
      user.destroy({ where: { id: id } })
        .then((u2) => {
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(403).send(false);
        });
    }
  });
});
router.post("/getUser",auth, (req, res) => {
  var id = req.headers["id"];
  user.findOne({ where: { id: id } }).then(function (u1) {
    if (!u1) {
      return res.status(403).send(false);
    } else {
      return res.status(200).json(u1.dataValues);
    }
  });
});
router.post("/login", (req, res) => {
  var login = req.body.login;
  var password = req.body.password;
  user
    .findOne({ 
      include: ["roles"],where: { login: login,etat:1 } })
    .then(function (u1) {
      if (!u1) {
        /* return res.status(403).send(false); */
        res.status(401).send({ message: "Utilisateur n'est pas Existe" });
      } else if (!u1.validPassword(password)) {
        res.status(401).send({ message: "Verfier votre Login et Mot de passe!" });
        /* return res.status(403).send(false); */
      } else {
        const payload = {
          //login: newdata.login,
          userauth: u1.dataValues,
        };
        const token = jwt.sign(payload, privateKey, {
          //   expiresIn: "2h",
        });
        return res.status(200).send({ data: u1.dataValues, token: token,message:true });
      }
    })
    .catch((error) => {
      return res.status(500).send(false);
    });
});
router.get("/getUserByRole/:idRole",auth, (req, res) => {
  user.findAll({
      where:{id_role:req.params.idRole}
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});

module.exports = router;
