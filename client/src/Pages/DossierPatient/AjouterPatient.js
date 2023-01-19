import React, { useEffect,useCallback } from "react";
import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import validator from "validator";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { patientAdded, patientGetById } from "../../Redux/patientReduce";
import { useDispatch } from "react-redux";
function AjouterPatient() {

  const dispatch = useDispatch();
  var token = localStorage.getItem("x-access-token");
  const location = useParams();
  //input
  const [nom, setNom] = React.useState("");
  const [age, setAge] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [id, setId] = React.useState(0);
  //required
  const [nomRequired] = React.useState(true);
  const [emailRequired] = React.useState(true);
  const [HeightRequired] = React.useState(true);
  const [weightRequired] = React.useState(true)
  const [TelRequired] = React.useState(true);
  const [AgeRequired] = React.useState(true);
 
 
  
  const etat = 1;
  const notificationAlertRef = React.useRef(null);
  const notify = (place, msg, type) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  async function submitForm(event) {
    var required = document.getElementsByClassName("required");
    var testPassword = true;
    for (var i = 0; i < required.length+1; i++) {  
      if(required[i] !== undefined){
        document.getElementsByClassName("error")[i].innerHTML=""; 
        required[i].style.borderColor = "#ccc"; 
        //condition required      
        if (validator.isEmpty(required[i].value) &&   required[i].name !=="Password" ) {
          required[i].style.borderColor = "red";
          document.getElementsByClassName("error")[i].innerHTML=required[i].name+" est obligatoire";
          notify("tr", required[i].name + " doit etre non vide", "danger");     
        } 
        //condition email
        else if(required[i].name ==="Email" && !validator.isEmail(required[i].value)){
          notify("tr", "E-mail invalide", "danger");
          document.getElementsByClassName("error")[i].innerHTML="E-mail invalide";
        }
      }
    }
 console.log("test");
    if (!validator.isEmpty(nom) && validator.isEmail(email) ) {
  console.log("test2");    
        dispatch(patientAdded({ id,nom, email, tel, age, height, weight, description })).then(data=>{
          var ch = "";
          (isNaN(location.id) === true)?ch="Insertion avec succès":ch="Modifier avec succès"
          switch(data.payload){
            case 200 : notify("tr", ch, "success");break;
            case 400 : notify("tr", "Vérifier vos données", "danger");break;
            case 403 : notify("tr", "Login déjà existe", "danger");break;
            default:break;
          }
        });   
    }
  }
  useEffect(() => {
  
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (isNaN(location.id) === false) {
          var user = await dispatch(patientGetById(location.id));
          var entities = user.payload;
          setNom(entities.nom_prenom); 
          setId(entities.id);
          setEmail(entities.email);
          setAge(entities.age);
          setTel(entities.tel);
          setHeight(entities.height);
          setWeight(entities.weight)
          setDescription(entities.description);
          resolve(entities);
        } else {
          resolve(0);
        }
      }, 0);
    });

    promise.then((value) => {
      
    });
   
  }, [location.id,dispatch,token]);

  function listePatient() {
    window.location.replace("/DossierPatient");
  }
  return (
    <>
      <Container fluid>
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <div className="section-image">
          <Container>
            <Row>
              <Col md="12">
                <Button
                  id="saveBL"
                  className="btn-wd btn-outline mr-1 float-left"
                  type="button"
                  variant="info"
                  onClick={listePatient}
                >
                  <span className="btn-label">
                    <i className="fas fa-list"></i>
                  </span>
                  Retour à la liste
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">
                          {typeof location.id == "undefined"
                            ? "Ajouter patient"
                            : "Modifier patient"}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Nom et Prenom* </label>
                            <Form.Control
                              defaultValue={nom}
                              placeholder="Nom"
                              name="Nom"
                              className="required"
                              type="text"
                              onChange={(value) => {
                                setNom(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <div className="error"></div>
                          {nomRequired ? null : (
                            <label className="error">
                              Nom est obligatoire.
                            </label>
                          )}
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Age </label>
                            <Form.Control
                              defaultValue={age}
                              placeholder="Age"
                              className="required"
                              name="Age"
                              type="Age"
                              onChange={(value) => {
                                setAge(value.target.value);
                              }}
                            ></Form.Control>
                            <div className="error"></div>
                            {AgeRequired ? null : (
                              <label className="error">
                                Age est obligatoire.
                              </label>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Height </label>
                            <Form.Control
                              defaultValue={height}
                              placeholder="Height"
                              className="required"
                              name="Height"
                              type="text"
                              onChange={(value) => {
                                setHeight(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <div className="error"></div>
                          {HeightRequired ? null : (
                            <label className="error">
                              Height est obligatoire.
                            </label>
                          )}
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Téléphone </label>
                            <Form.Control
                              defaultValue={tel}
                              placeholder="Téléphone"
                              type="number"
                              onChange={(value) => {
                                setTel(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <div className="error"></div>
                          {TelRequired ? null : (
                            <label className="error">
                              Telephone est obligatoire.
                            </label>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>E-mail* </label>
                            <Form.Control
                              defaultValue={email}
                              placeholder="E-mail"
                              name="Email"
                              className="required"
                              type="text"
                              onChange={(value) => {
                                setEmail(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                       
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                            <label>Description </label>
                            <Form.Control
                              defaultValue={description}
                              placeholder="Description"
                              name="Description"
                              type="text"
                              onChange={(value) => {
                                setDescription(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Weight </label>
                            <Form.Control
                              defaultValue={weight}
                              placeholder="Weight"
                              name="Weight"
                              className="required"
                              type="text"
                              onChange={(value) => {
                                setWeight(value.target.value);
                              }}
                            ></Form.Control>
                            <div className="error"></div>
                          {TelRequired ? null : (
                            <label className="error">
                              Telephone est obligatoire.
                            </label>
                          )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btn-fill pull-right"
                        type="button"
                        variant="info"
                        onClick={submitForm}
                      >
                        Enregistrer
                      </Button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default AjouterPatient;
