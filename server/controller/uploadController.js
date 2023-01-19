const express = require("express");
const router = express.Router();
var uploade = require("../models/upload");
var patient = require("../models/patient");
const auth = require("../middlewares/passport");
const multer = require("multer");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/patient");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


router.post("/saveFile", upload.single("image"),(req, res) => {
  res.send({ filename: req.body.name });
});


// Desplay all lignes of client ...
router.post("/addUpload", (req, res) => {
  var id = req.body.id;
  console.log(req.body);
  if (id == 0) {
    uploade
      .create({
        file: req.body.file,
        description: req.body.description,
        id_patient: req.body.idpatient
      })
      .then((r) => {
        return res.status(200).send(true);
      })
      .catch((error) => {
        return res.status(403).send(false);
      });
  } 
});
router.post("/allUpload",auth, (req, res) => {
  uploade.findAll({
      include: ["patient"],
      order:[["id","desc"]]
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});
router.get("/getUploadbyIdPatient/:idPatient",auth, (req, res) => {
  uploade.findAll({
      where:{id_patient:req.params.idPatient}
    })
    .then(function (r) {
      return res.status(200).send(r);
    });
});
router.delete("/deleteFile/:id", (req, res) => {
  var id = req.params.id;
  uploade.findOne({ where: { id: id } }).then(function (r1) {
    if (!r1) {
      return res.status(403).send(false);
    } else {
      var file = r1.dataValues.file;
      if (file != "")
        if (fs.existsSync("./upload/patient/" + file)) fs.unlinkSync("./upload/patient/" + file);
      uploade.destroy({ where: { id: id } })
        .then((r2) => {
          return res.status(200).send(true);
        })
        .catch((error) => {
          return res.status(403).send(false);
        });
    }
  });
});
router.get("/file/:file", (req, res) => {
  if (fs.existsSync("./upload/patient/" + req.params.file)) { 
    var file = fs.createReadStream(
      "./upload/patient/" + req.params.file
    );
    file.pipe(res);
  } else return res.status(403).json({ message: false });
});

module.exports = router;