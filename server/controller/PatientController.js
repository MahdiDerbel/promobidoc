const express = require("express");
const router = express.Router();
var patient = require("../models/patient");
const auth = require("../middlewares/passport");

// Desplay all lignes of client ...
router.post("/addPatient", (req, res) => {
  var id = req.body.id;
 
  if (id == 0) { 
   patient
      .create({
        nom_prenom: req.body.nom,
        tel: req.body.tel,
        age: req.body.age,
        email: req.body.email,
        description: req.body.description,
        height: req.body.height,
        weight: req.body.weight
      })
      .then((r) => {
        return res.status(200).send(true);
      })
      .catch((error) => {
        return res.status(403).send(error);
      });
  } else {
   patient.findOne({ where: { id: id } }).then(function (r1) { 
      if (!r1) {
        return res.status(403).send(false);
      } else {
       patient
          .update({
        nom_prenom: req.body.nom,
        tel: req.body.tel,
        age: req.body.age,
        email: req.body.email,
        description: req.body.description,
        height: req.body.height,
        weight: req.body.weight
          },{ where: { id: id } })
          .then((r2) => {
            return res.status(200).send(true);
          })
          .catch((error) => {
            return res.status(403).send(false);
          });
      }
    });
  }
});

//Delete client
router.delete("/deletePatient/:id", (req, res) => {
  var id = req.params.id;
 patient.findOne({ where: { id: id } }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
     patient.destroy({ where: { id: id } })
        .then((r2) => {
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(403).send(false);
        });
    }
  });
});
router.post("/getPatient",auth, (req, res) => {
  var id = req.headers["id"];
 patient.findOne({ where: { id: id } }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
      return res.status(200).json(r1.dataValues);
    }
  });
});
router.post("/allPatient",auth, (req, res) => {
    patient.findAll({order:["id"]}).then(function (r) {
      return res.status(200).send(r);
    });
  });
module.exports = router;
