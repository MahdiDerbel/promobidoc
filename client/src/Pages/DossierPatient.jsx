import React from 'react';
import NotificationAlert from "react-notification-alert";
import ReactTable from "../components/ReactTable/ReactTable.js";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { profilUpdated } from "../Redux/usersReduce";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import Modal from 'react-modal';
Modal.setAppElement('#root');
const DossierPatient = () => {
  const [fName, setFName] = React.useState('')
    const [lName, setLName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [height, setHeight] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [weight, setWeight] = React.useState('')
    const [list, setList] = React.useState([])

    const handleClick =(e)=>{
       
        const newPatient ={
            id:Math.random(),
            firstname:fName,
            lastname:lName,
             createtime:Date.now()
            

        };
        setList([...list,newPatient])
        e.preventDefault();
        setIsOpen(false)
        
    }
  
    
    const [entities, setEntities] = React.useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
  
    
  
    function closeModal() {
      setIsOpen(false);
    }
    function management() {
      window.location.href = "/management";
    }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
          <Button 
              id="saveBL"
              className="btn-wd btn-outline mr-1 float-left"
              type="button"
              variant="info"
              onClick={openModal}
            >
              <span className="btn-label">
                <i className="fas fa-plus"></i>
              </span>
              Ajouter un Patient
            </Button>
  <Modal
    isOpen={modalIsOpen}
    
    onRequestClose={closeModal}
    
    contentLabel="Example Modal"
  >
    
    
    
    <form>
    <div id="wrap" className="">
              <br/>
              <button type="button" class="close" aria-label="Close" onClick={closeModal}>
                 <span aria-hidden="true">&times;</span>
              </button>
              <br/>
              
              
              <div className="container align-items-center">
            
              
                 <br/>

                  <form className="form1" >

                      <div>First Name: <input required value={fName} onChange={(e)=>setFName(e.target.value)} className="form-control mr-sm-2"  type="text" placeholder="First name" /></div><br/>
                      <div>Last Name: <input className="form-control mr-sm-2" value={lName} onChange={(e)=>setLName(e.target.value)} type="text" placeholder="Last name" /></div><br/>
                      <div className="radio" >Gender:<br/> <input className="" name="gender" value="Male"  type="radio" /> Male <input className="" name="gender" value="Female"  type="radio" /> Female </div><br/>
                      <div>Age: <input className="form-control mr-sm-2" value={age} onChange={(e)=>setAge(e.target.value)}  type="text" placeholder="Age" /></div><br/>
                      <div>Email: <input className="form-control mr-sm-2" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" /></div><br/>
                      <div>Weight: <input className="form-control mr-sm-2" value={weight} onChange={(e)=>setWeight(e.target.value)} type="text" placeholder="Weight in Kg" /></div><br/>
                      <div>Height: <input className="form-control mr-sm-2" value={height} onChange={(e)=>setHeight(e.target.value)} type="text" placeholder="Height in Metre" /></div><br/>
                      <div>Description: <input className="form-control mr-sm-2" value={description} onChange={(e)=>setDescription(e.target.value)}  type="text" /></div><br/>
                  
                  <div> <button onClick={handleClick} className="btn btn-success" type="submit">Add Patient</button> </div>

                  
                  </form>

                  
                  
              </div> 
              
          </div>
          
    </form>
  </Modal>
          </Col>
          <Col md="12">
            <h4 className="title">Liste des Patient</h4>
            <h4 className="title">gdfsdqt</h4>
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
                      Header: "e-mail",
                      accessor: "email",
                    },
                    {
                      Header: "téléphone",
                      accessor: "tel",
                    },
                    

                    {
                      Header: "actions",
                      accessor: "id",
                      Cell: ({ cell }) => (
                        <div className="actions-right block_action">
                          <Button
                            onClick={() => {
                              window.location.replace(
                                "/ajoute" + cell.row.values.id
                              );
                            }}
                            variant="warning"
                            size="sm"
                            className="text-warning btn-link edit"
                          >
                            <i className="fa fa-edit" />
                          </Button>
                          
                        </div>
                      ),
                    },
                  ]} 
                  className="-striped -highlight primary-pagination"
                />
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className='patient_Tableau'>{list.map((t,i) => (
          <div><ul key={i}>
            <li><img style={{width:100}} src="https://img.freepik.com/photos-gratuite/icone-dossier-jaune_53876-71296.jpg?w=2000" alt="dossier" />

            <Button
              id="saveBL"
              className="btn-wd btn-outline mr-1 float-left"
              type="button"
              variant="info"
              onClick={management}
            >
              <span className="btn-label">
                <i className="fas fa-plus"></i>
              </span>
              Ouvrir le dossier
            </Button>

            {t.firstname}{t.lastname} 
            
            
            </li>
            
          </ul></div>
        ))}</div>
      
    </>
  );
}

export default DossierPatient;