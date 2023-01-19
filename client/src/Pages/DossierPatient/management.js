import React,{useEffect,useCallback} from "react";
import ReactTable from "../../components/ReactTable/ReactTable.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {getUploadbyIdPatient,fileDeleted,fetchFile} from "../../Redux/uploadReduce";
import { useDispatch } from "react-redux";
// react component used to create alerts
// react-bootstrap components

function Management() {
const[FileUrl,setFileUrl]=React.useState(null);
const [alert, setAlert]  = React.useState(null);
const dispatch = useDispatch();
const location = useParams();
const notificationAlertRef = React.useRef(null);
var id=location.id;
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
function upload() {
  window.location.href ="/patient/dossier/FileUpload/"+location.id
}
const getFiles = useCallback(
  async (file) => {
    var f = await dispatch(fetchFile(file));
    var res = f.payload;
    return res;
  },
  [dispatch]
);
const listeBl = useCallback(
  async () => {
    var list = await dispatch(getUploadbyIdPatient(location.id));
    var res = list.payload;
    for (const key in res) {
      var r = await getFiles(res[key].file);
      res[key].fileURL = r
    }
    console.log(res)
    setEntities(res);
  },
  [dispatch, getFiles, id]
);
useEffect(() => { 
  listeBl();
  /* const promise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      var i
        var response = await dispatch(getUploadbyIdPatient(location.id));
        resolve(response.payload);
    }, 0);
  });

  promise.then((value) => {
    setEntities(value);
  }); */
}, [dispatch,listeBl])

const confirmMessage = (id,e) => {
  setAlert(
    <SweetAlert
      style={{ display: "block", marginTop: "-100px" }}
      title="Vous éte sure de supprime cette fichier?"
      onConfirm={() => deleteFile(id,e)}
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

function deleteFile(id,e) {
  dispatch(fileDeleted({ id }));
  window.location.reload();
  hideAlert();
  notify("tr", "file supprimer avec succes", "success");
}

function download(filename){
  var file = dispatch(getUploadbyIdPatient(entities[0].file));
  setFileUrl(file.payload)
  console.log(file);
 
}


    
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
          <Col md="13">
            <div>&nbsp;</div>
            <Button
              id="saveBL"
              className="btn-wd btn-outline mr-1 float-left"
              type="button"
              variant="info"

              onClick={upload}
            >
              <span className="btn-label">
                <i className="fas fa-plus"></i>
              </span>
              File Upload
            </Button>
          </Col>
          <Col md="12">
            <h4 className="title">Liste des fichiers</h4>
            <Card className="card-header">
              <Card.Body>
                <ReactTable
                  data={entities}
                  
                  columns={[
                    {
                      Header: "Nom Du fichier",
                      accessor: "description",
                    },
                    
                  
                    {
                      Header: "actions",
                      accessor: "id",
                      Cell: ({ cell }) => (
                        <div className="actions-right block_action">
                          {/* <button class="downbtn" onClick={(download(cell.row.values.id))}><i class="fa fa-download"></i> Télecharger</button> */}
                          
                          <Button
                              className="downbtn"
                              rel="noreferrer"
                              href={cell.row.original.fileURL}
                              download={cell.row.original.file}
                              target="_blank"
                            >
                              <i className="fas fa-file"></i>
                              Télecharger
                          </Button>
                          <Button
                            id={"idLigne_" + cell.row.values.id}
                            onClick={(e) => {
                              confirmMessage(cell.row.values.id,e);
                            }}
                            variant="danger"
                            size="sm"
                            className="text-danger btn-link delete"
                          >
                            <i className="fa fa-trash" id={"idLigne_" + cell.row.values.id}/>Supprimer
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

export default Management;
