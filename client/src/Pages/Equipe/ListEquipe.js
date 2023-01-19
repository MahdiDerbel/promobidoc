import ReactTable from "../../components/ReactTable/ReactTable.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import React,{useEffect} from "react";
import { fetchEquipes,equipeDeleted } from "../../Redux/equipeReduce";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
//store.dispatch(fetchequipe());

// core components
function ListEquipe() {
  const dispatch = useDispatch();
  const notificationAlertRef = React.useRef(null);
  const [alert, setAlert]  = React.useState(null);
  const [entities, setEntities] = React.useState([]);
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
        title="Vous éte sure de supprime cette staff?"
        onConfirm={() => deleteEquipe(id,e)}
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
  function deleteEquipe(id,e) {
    dispatch(equipeDeleted({ id }));
    window.location.reload();
    hideAlert();
    //notify("tr", "Role supprimer avec succes", "success");
  }
  const hideAlert = () => {
    setAlert(null);
  };
  function ajouter() {
    window.location.href = "/ajouterStaff";
  }
  
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
          var response = await dispatch(fetchEquipes());
          resolve(response.payload);
      }, 0);
    });

    promise.then((value) => {
      setEntities(value);
    });
  }, [dispatch])
  /* var { entities } = useSelector((state) => state.equipes); */
  return (
    <>
      {alert}
      <Container fluid>
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
              Ajouter un staff
            </Button>
          </Col>
          <Col md="12">
            <h4 className="title">Liste des staffs</h4>
            <Card className="card-header">
              <Card.Body>
                <ReactTable
                  data={entities}
                  columns={[
                    {
                      Header: "Personel",
                      accessor: "users",
                      Cell: ({ cell }) => (cell.row.values.users.nom_prenom),
                    },
                    {
                      Header: "Function",
                      accessor: "roles",
                      Cell: ({ cell }) => (cell.row.values.roles.nom),
                    },
                    {
                      Header: "actions",
                      accessor: "id",
                      Cell: ({ cell }) => (
                        <div className="actions-right block_action">
                          {/* <Button
                            onClick={() => {
                              window.location.replace(
                                "/staff/update/" + cell.row.values.id
                              );
                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link edit"
                          >
                            <i className="fa fa-edit" />
                          </Button> */}
                          <Button
                            id={"idLigne_" + cell.row.values.id}
                            onClick={(event) => {
                              confirmMessage(cell.row.values.id,event);
                            }}
                            variant="danger"
                            size="sm"
                            className={cell.row.values.etat === 1?"text-success btn-link delete":"text-danger btn-link delete"}
                          >
                            <i className="fa fa-trash"/>
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

export default ListEquipe;
