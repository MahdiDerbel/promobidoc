const express = require("express");
const router = express.Router();
var notebook = require("../models/notebook");
var patient = require("../models/patient");
const auth = require("../middlewares/passport");

var fs = require("fs");
// Desplay all lignes of client ...
router.post("/addNotebook", (req, res) => {
    var id = req.body.id;
   
    if (id == 0) { 
     notebook
        .create({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            id_patient: req.body.idpatient
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
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        id_patient: req.body.idpatient
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
router.post("/allNotebook",auth, (req, res) => {
  notebook.findAll({
      include: ["patient"],
      order:[["id","desc"]]
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});
router.get("/getNotebookbyIdPatient/:idPatient",auth, (req, res) => {
  notebook.findAll({
      where:{id_patient:req.params.idPatient}
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});

router.delete("/deleteNotebook/:id", (req, res) => {
  var id = req.params.id;
  notebook.findOne({ where: { id: id } }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
     if (fs.existsSync("./notebook/patient/" )) fs.unlinkSync("./notebook/patient/");
      notebook.destroy({ where: { id: id } })
        .then((r2) => {
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(403).send(false);
        });
    }
  });
});
module.exports = router;