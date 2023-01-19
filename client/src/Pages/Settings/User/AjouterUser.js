import React, { useEffect,useCallback } from "react";
import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import validator from "validator";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { userAdded, userGetById } from "../../../Redux/usersReduce";
import { fetchRole } from "../../../Redux/roleReduce";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
function AjouterUser() {

  const dispatch = useDispatch();
  var token = localStorage.getItem("x-access-token");
  const location = useParams();
  //input
  const [nom, setNom] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState(0);
  const [id, setId] = React.useState(0);
  //required
  const [nomRequired] = React.useState(true);
  const [emailRequired] = React.useState(true);
  const [loginRequired] = React.useState(true);
  const [passwordRequired] = React.useState(true);
  const [roleRequired] = React.useState(true);
  const etat = 1;
  const notificationAlertRef = React.useRef(null);
  const [options, setOptions] = React.useState([
    {
      value: "",
      label: "Role",
      isDisabled: true,
    },
  ]);
  const [roleSelect, setRoleSelect] = React.useState({
    value: 0,
    label: "Role",
  });
  const [typeSelect, setTypeSelect] = React.useState(null);
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
        //condition password
        else if( (required[i].name ==="Password" && isNaN(location.id) === true) ||
        (required[i].name ==="Password" && !validator.isEmpty(required[i].value) && isNaN(location.id) === false) ){
          if (!validator.isLength(required[i].value,{min:6, max: 20})) {
            testPassword = false;
            notify("tr", "Password doit etre minimum 6 charactére", "danger");
            document.getElementsByClassName("error")[i].innerHTML="Password doit etre minimum 6 charactére";
          }
        }
      }
    } 
    var roleClass = document.querySelector("#roleClass .react-select__control");
    roleClass.style.borderColor = "#ccc";    
    if(role === 0){
      roleClass.style.borderColor = "red"; 
      notify("tr", "Choisire un role", "danger");
    }
    if (!validator.isEmpty(nom) && validator.isEmail(email) && !validator.isEmpty(login) && testPassword === true  &&
      (role >0)) {
      
        dispatch(userAdded({ nom, email, tel, login, password, id, etat, role,typeSelect })).then(data=>{
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
    async function getRole(p) {
      var role = await dispatch(fetchRole(token));
      var entities = role.payload;
      var arrayOption = [];
      arrayOption.push({ value: 0, label: "Role" });
      entities.forEach((e) => {
        arrayOption.push({ value: e.id, label: e.nom });
        if (e.id === p) {
          setRoleSelect({ value: e.id, label: e.nom });
        }
      });
      setOptions(arrayOption);
    }
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (isNaN(location.id) === false) {
          var user = await dispatch(userGetById(location.id));
          var entities = user.payload;
          setNom(entities.nom_prenom);
          setEmail(entities.email);
          setLogin(entities.login);
          setTel(entities.tel);
          setRole(entities.id_role);
          setId(location.id);
          resolve(entities);
        } else {
          resolve(0);
        }
      }, 0);
    });

    promise.then((value) => {
      var roles=0;
      if(value !== 0) {
        roles=value.id_role;
      }     
      getRole(roles); 
    });
   
  }, [location.id,dispatch,token]);

  function listeUser() {
    window.location.replace("/utilisateurListe");
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
                  onClick={listeUser}
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
                            ? "Ajouter utilisateur"
                            : "Modifier utilisateur"}
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
                            <label>Password* </label>
                            <Form.Control
                              defaultValue={password}
                              placeholder="Password"
                              className="required"
                              name="Password"
                              type="password"
                              onChange={(value) => {
                                setPassword(value.target.value);
                              }}
                            ></Form.Control>
                            <div className="error"></div>
                            {passwordRequired ? null : (
                              <label className="error">
                                Password est obligatoire.
                              </label>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Login* </label>
                            <Form.Control
                              defaultValue={login}
                              placeholder="Login"
                              className="required"
                              name="Login"
                              type="text"
                              onChange={(value) => {
                                setLogin(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <div className="error"></div>
                          {loginRequired ? null : (
                            <label className="error">
                              Login est obligatoire.
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
                          <div className="error"></div>
                          {emailRequired ? null : (
                            <label className="error">
                              Email est obligatoire.
                            </label>
                          )}
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group id="roleClass">
                            <label>Role* </label>
                            <Select
                              placeholder="Role"
                              className="react-select primary"
                              classNamePrefix="react-select"
                              value={roleSelect}
                              onChange={(value) => {
                                setRoleSelect(value);
                                setRole(value.value);
                              }}
                              options={options}
                            />
                          </Form.Group>
                          {roleRequired ? null : (
                            <div className="error">
                              Role est obligatoire.
                            </div>
                          )}
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

export default AjouterUser;
