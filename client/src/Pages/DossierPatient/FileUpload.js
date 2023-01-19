import React, { useEffect } from "react";
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import {uploadUpdated,uploadGetById,getUpload} from "../../Redux/uploadReduce";
import{fetchPatient} from "../../Redux/patientReduce"
function FileUpload() {
  const dispatch = useDispatch(); 
  var token = localStorage.getItem("x-access-token");
  const location = useParams();
  //input
  const [file, setFile] = React.useState("");
  const [fileBD, setFileBD] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const[idpatient,SetIdPatient]= React.useState(location.id);

  const notificationAlertRef = React.useRef("");
  const notify = (place, msg, type) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {msg}
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  function submitForm(event) {
    const dataArray = new FormData();
    dataArray.append("image", file);
    dataArray.append("name", file.name);
    var settingsObj = {id:0,file:file.name,description:description,idpatient:idpatient}
    dispatch(uploadUpdated({ dataArray,settingsObj }));
    notify("tr", "Le fichier a été ajouté avec succès", "success");
  }

  
  const uploadfile = (acceptedFiles) => {
    setFileBD(false)
    setFile(acceptedFiles[0]);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  };
  function listeDossier() {
    window.location.replace("/patient/dossier/"+location.id);
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
              <Col md="11">
                <Button
                  id="saveBL"
                  className="btn-wd btn-outline mr-1 float-left"
                  type="button"
                  variant="info"
                  onClick={listeDossier}
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
                        <Card.Title as="h4">Ajouter le fichier</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Description* </label>
                            <Form.Control
                              defaultValue={description}
                              placeholder="Description"
                              name="Title"
                              className="required"
                              type="text"
                              onChange={(value) => {
                                setDescription(value.target.value);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <div className="error"></div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <div className="App">
                            <Dropzone onDrop={uploadfile}>
                              {({ getRootProps, getInputProps }) => (
                                <div
                                  {...getRootProps({
                                    className: "dropzone",
                                  })}
                                >
                                  <input {...getInputProps()} />                            
                                  <p>
                                    {fileUrl !==""?<i className="fas fa-file-pdf"></i> : 
                                    fileBD !== false && file!=="" ? <i className="fas fa-file-pdf"></i>:
                                      "Il y a aucun fichier selectionner"} 
                                  </p>
                                  <p>Choisissez un fichier</p>
                                </div>
                              )}
                            </Dropzone>
                          </div>
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

export default FileUpload;
