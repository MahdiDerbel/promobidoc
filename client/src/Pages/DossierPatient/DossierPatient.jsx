import ReactTable from "../../components/ReactTable/ReactTable.js";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React,{useEffect} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {fetchPatient,patientDeleted} from "../../Redux/patientReduce";
import { useDispatch } from "react-redux";
//store.dispatch(fetchuser());

// core components
function DossierPatient() {
  const dispatch = useDispatch();
  const [alert, setAlert]  = React.useState(null);
  const [entities, setEntities] = React.useState([]);
  const notificationAlertRef = React.useRef(null);
  function ajouter() {
    window.location.href = "/ajouterPatient";
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
        title="Vous éte sure de supprimer cette patient?"
        onConfirm={() => deletePatient(id,e)}
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
  
  function deletePatient(id,e) {
    dispatch(patientDeleted({ id }));
    window.location.reload();
    hideAlert();
    notify("tr", "Patient supprimer avec succes", "success");
  }
  
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
          var response = await dispatch(fetchPatient());
          resolve(response.payload);
      }, 0);
    });

    promise.then((value) => {
      setEntities(value);
    });
  }, [dispatch])
  /* var { entities } = useSelector((state) => state.users); */
  return (
    <>
      <Container fluid>
         {alert}
        <Row>
          <Col md="12">
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
              Ajouter Patient
            </Button>
          </Col>
          <Col md="12">
            <h4 className="title">Liste des Patients</h4>
            <Card className="card-header">
              <Card.Body>
                <ReactTable
                  data={entities}
                  columns={[
                    {
                      Header: "Nom et Prenom",
                      accessor: "nom_prenom",
                    },
                    {
                      Header: "Age",
                      accessor: "age",
                    },
                    {
                      Header: "e-mail",
                      accessor: "email",
                    },
                     {
                      Header: "Description",
                      accessor: "description",
                    },
                    {
                      Header: "téléphone",
                      accessor: "tel",
                    },
                    {
                      Header: "Gender",
                      accessor: "gender",
                      Cell: ({ cell }) => (cell.row.values.gender === 1?"Femme":"Homme"),
                    },
                    {
                      Header: "actions",
                      accessor: "id",
                      Cell: ({ cell }) => (
                        <div className="actions-right block_action">
                          <Button
                            onClick={() => {
                              window.location.replace(
                                "/patient/update/" + cell.row.values.id
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
                        
                         
                          <Button
                            onClick={() => {
                              window.location.replace(
                                "/patient/dossier/" + cell.row.values.id
                              );
                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link add"
                          >
                            Ajout dossier
                            <i className="fa fa-plus" />
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

export default DossierPatient;
