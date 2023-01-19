// Importing the packages required for the project.
// {alter:true }
const express = require("express");
var app = express();
const path = require("path");
var cors = require("cors");
app.use(cors());


/* app.use(express.static(path.join(__dirname, "../client/build"))); */
// Used for sending the Json Data to Node API 
app.use(express.json());
var corsOptions = {
  origin: "http://localhost:4000/login",
};
/* sequelize.sync({alter:true}) cette commande pour alter table dans n import model*/
app.use("/role/", require("./controller/roleController"));
app.use("/user/", require("./controller/userController"));
app.use("/settings/", require("./controller/settingsController"));
app.use("/equipe/", require("./controller/equipeController"));
app.use("/patient/", require("./controller/patientController"));
app.use("/FileUpload/", require("./controller/uploadController"));
app.use("/Notebook/", require("./controller/notebookController"));
/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});  */



const PORT = 4000 || 5000 || 6000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`app listening on port ${PORT}!`)
);
