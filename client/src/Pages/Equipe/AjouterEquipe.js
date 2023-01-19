import React, { useEffect,useCallback } from "react";
import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import validator from "validator";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { equipeAdded, equipeGetById } from "../../Redux/equipeReduce";
import { getUserByRole } from "../../Redux/usersReduce";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
function AjouterEquipe() {

  const dispatch = useDispatch();
  var token = localStorage.getItem("x-access-token");
  const location = useParams();
  //input
  const [id, setId] = React.useState(0);
  const notificationAlertRef = React.useRef(null);

  const [optionUser, setOptionUser] = React.useState([
    {
      value: "",
      label: "User",
      isDisabled: true,
    },
  ]);
  const [user, setUser] = React.useState(0);
  const [userSelect, setUserSelect] = React.useState({
    value: 0,
    label: "User",
  });

  const [optionRole] = React.useState([
    {
      value: "",
      label: "Role",
      isDisabled: true,
    },
    {value: 4,label: "Infermier"},
    {value: 5,label: "Pharmacogénétique"}
  ]);
  const [roleSelect, setRoleSelect] = React.useState({
    value: 0,
    label: "Role",
  });
  const [role, setRole] = React.useState(0);

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
    if ((user >0) && (role >0)) {
      var ch= isNaN(location.id) === true?"Insertion avec succès":"Modifier avec succès";
      notify("tr", ch, "success");
      dispatch(equipeAdded({ role,user, id }));
    } else {
      notify("tr", "Tous les donnée obligatoire", "danger");
    }
  }
  
  const getUser = useCallback(async (r) =>{
    setUser(0);
    var user = await dispatch(getUserByRole(r));  
    var entities = user.payload;
    var arrayOption = [];
    entities.forEach((e) => {
      arrayOption.push({ value: e.id, label: e.nom_prenom });
    });
    setOptionUser(arrayOption);
  }, [dispatch])
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (isNaN(location.id) === false) {
          var equipe = await dispatch(equipeGetById(location.id));
          var entities = equipe.payload;
          /* setNom(entities.nom_prenom);
          setEmail(entities.email);
          setLogin(entities.login);
          setTel(entities.tel);
          setRole(entities.id_role); */
          setId(location.id);
          resolve(entities);
        } else {
          resolve(0);
        }
      }, 0);
    });

    promise.then((value) => {
    });
   
  }, [location.id,dispatch,token]);

  function listeEquipe() {
    window.location.replace("/staffListe");
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
                  onClick={listeEquipe}
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
                            ? "Ajouter staff"
                            : "Modifier staff"}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group id="roleClass">
                            <label>Function* </label>
                            <Select
                              placeholder="Role"
                              className="react-select primary"
                              classNamePrefix="react-select"
                              value={roleSelect}
                              onChange={(value) => {
                                setRoleSelect(value);
                                setRole(value.value);
                                getUser(value.value);
                              }}
                              options={optionRole}
                            />
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group id="roleClass">
                            <label>Personel* </label>
                            <Select
                              placeholder="Type document"
                              className="react-select primary"
                              classNamePrefix="react-select"
                              value={userSelect}
                              onChange={(value) => {
                                setUserSelect(value);
                                setUser(value.value);
                              }}
                              options={optionUser}
                            />
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

export default AjouterEquipe;
