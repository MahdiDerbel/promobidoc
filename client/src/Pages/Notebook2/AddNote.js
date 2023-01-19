import React, { useEffect,useCallback } from "react";
import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import validator from "validator";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { notebookAdded, getNotebookbyIdPatient,NotebookUpdated,NotebookAdded} from "../../Redux/notebookReduce";
import { useDispatch } from "react-redux";
function AjouterNotebook() {
  const dispatch = useDispatch();
  var token = localStorage.getItem("x-access-token");
  const location = useParams();
  //input
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const[idpatient,SetIdPatient]= React.useState(location.id);
  const [id, setId] = React.useState(0);
  //required
  const [titleRequired] = React.useState(true);
  const [descriptionRequired] = React.useState(true);
  const [contentRequired] = React.useState(true);
 
 
  
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
  function submitForm(event) {
    if(title !== ""){
      if (isNaN(location.id) === true) {
        dispatch(NotebookAdded({ title, id,content,description,idpatient }));
        notify("tr", "Insertion avec succes", "success");
      } else {
        dispatch(NotebookUpdated({title, id,content,description,idpatient }));
        notify("tr", "Modifier avec succes", "success");
      }
    } else {
      notify("tr", "title est obligatoire", "danger");
    }
  }
  useEffect(() => {
    async function getNotebook() {
      if (isNaN(location.id) === false) {
        var Notebook = await dispatch(getNotebookbyIdPatient(location.id));
        var entities = Notebook.payload;
        setTitle(entities.title);
        setContent(entities.content);
        setDescription(entities.description);
        SetIdPatient(location.id);
      }
    }
    getNotebook();
  }, [location.id,dispatch]);


  function listeNotebook() {
    window.location.href ="/patient/dossier/ListNote/"+location.id}
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
                  onClick={listeNotebook}
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
                            ? "Ajouter Notebook"
                            : "Modifier Notebook"}
                        </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Title</label>
                            <Form.Control
                              defaultValue={title}
                              placeholder="Nom"
                              name="Nom"
                              className="required"
                              type="text"
                              onChange={(value) => {
                                setTitle(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <div className="error"></div>
                          {titleRequired ? null : (
                            <label className="error">
                              Titre est obligatoire.
                            </label>
                          )}
                        </Col>
                      </Row>
                      <Row>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Content* </label>
                            <Form.Control
                              defaultValue={content}
                              placeholder="Content"
                              name="Content"
                              className="required"
                              type="text"
                              onChange={(value) => {
                                setContent(value.target.value);
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

export default AjouterNotebook;
