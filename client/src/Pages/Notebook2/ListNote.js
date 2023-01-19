import ReactTable from "../../components/ReactTable/ReactTable.js";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React,{useEffect} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {getNotebookbyIdPatient,notebookDeleted} from "../../Redux/notebookReduce";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//store.dispatch(fetchuser());

// core components
function Notebook() {
 const location = useParams();
  const dispatch = useDispatch();
  const [alert, setAlert]  = React.useState(null);
  const [entities, setEntities] = React.useState([]);
  const notificationAlertRef = React.useRef(null);
  function ajouter() {
    window.location.href ="/patient/dossier/AddNote/"+location.id
  }
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
  const confirmMessage = (id,e) => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Vous éte sure de supprimer cette Notebook?"
        onConfirm={() => deleteNotebook(id,e)}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        confirmBtnText="Oui"
        cancelBtnText="Non"
        showCancel
      >
        {/* Vous éte sure de supprime cette User? */}
      </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };
  
  function deleteNotebook(id,e) {
    dispatch(notebookDeleted({ id }));
    window.location.reload();
    hideAlert();
    notify("tr", "Notebook supprimer avec succes", "success");
  }
  

  /* var { entities } = useSelector((state) => state.users); */

  
  return (
    <>
    <div className="topnav" id="myTopnav">
  <a href={"/patient/dossier/"+location.id}className="active">Upload file</a>
  <a href={"/patient/dossier/quiz/"+location.id}className="active">Questionnaire</a>
  <a href={"/patient/dossier/adadose/"+location.id}className="active">Adaptation du dose</a>
  <a href={"/patient/dossier/ListNote/"+location.id}className="active">Notebook</a>

</div>
      <Container fluid>
         {alert}
        <Row>
          <Col md="12">
          <div>&nbsp;</div>
            <Button
              id="saveBL"
              className="btn-wd btn-outline mr-1 float-left"
              type="button"
              variant="info"
              onClick={ajouter}
            >
              <span className="btn-label">
                <i className="fas fa-plus"></i>
              </span>
              Ajouter Note
            </Button>
          </Col>
          <Col md="12">
            <h4 className="title">Liste des Note</h4>
            <Card className="card-header">
              <Card.Body>
                <ReactTable
                  data={entities}
                  columns={[
                    {
                      Header: "Title",
                      accessor: "title",
                    },
                     {
                      Header: "Description",
                      accessor: "description",
                    },
                    {
                      Header: "actions",
                      accessor: "id",
                    },
                    {
                      Header: "actions",
                      accessor: "id_patient",
                      Cell: ({ cell }) => (
                        <div className="actions-right block_action">
                          <Button
                            onClick={() => {
                             
                              window.location.replace(
                                "/Notebook/update/" + cell.row.values.id
                              );
                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link edit"
                          >
                            <i className="fa fa-edit" />
                          </Button>
                          <Button
                            id={"idLigne_" + cell.row.values.id}
                            onClick={(e) => {
                              confirmMessage(cell.row.values.id,e)
                              
                            }}
                            variant="danger"
                            size="sm"
                            className={cell.row.values.etat === 1?"text-success btn-link deleteFile":"text-danger btn-link deleteFile"}
                          >
                            <i className={cell.row.values.etat === 1?"fa fa-check":"fa fa-times"} id={"idLigne_" + cell.row.values.id}/>
                          </Button>
                        
                         
                          
                        </div>
                      ),
                    },
                  ]} 
                  className="-striped -highlight primary-pagination"
                />
                {entities.length === 0 ? (
                  <div className="text-center">Aucun donnée trouvé</div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Notebook;
