const express = require("express");
const router = express.Router();
var equipe = require("../models/equipe");
const auth = require("../middlewares/passport");

// Desplay all lignes of client ...
router.post("/addEquipe", (req, res) => {
  var id = req.body.id;
  if (id == 0) {
    equipe
      .create({
        id_role: req.body.role,
        id_user: req.body.user,
      })
      .then((e) => {
        return res.status(200).send(true);
      })
      .catch((error) => {
        return res.status(403).send(false);
      });
  } else {
    equipe.findOne({ where: { id: id } }).then(function (r1) { 
      if (!r1) {
        return res.status(403).send(false);
      } else {
        equipe
          .update({
            id_role: req.body.idRole,
            id_user: req.body.idUser,
          },{ where: { id: id } })
          .then((e) => {
            return res.status(200).send(true);
          })
          .catch((error) => {
            return res.status(403).send(false);
          });
      }
    });
  }
});
router.post("/allEquipe",auth, (req, res) => {
  equipe.findAll({include:["users","roles"],order:["id"]}).then(function (r) {
    return res.status(200).send(r);
  });
});

//Delete client
router.delete("/deleteEquipe/:id", (req, res) => {
  var id = req.params.id;
  equipe.findOne({ where: { id: id } }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
      equipe.destroy({ where: { id: id } })
        .then((r2) => {
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(403).send(false);
        });
    }
  });
});
router.post("/getEquipe",auth, (req, res) => {
  var id = req.headers["id"];
  equipe.findOne({ where: { id: id },include:["users","roles"] }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
      return res.status(200).json(r1.dataValues);
    }
  });
});

module.exports = router;
