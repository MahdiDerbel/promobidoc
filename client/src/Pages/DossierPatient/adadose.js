import loader from '../../assets/img/logo.gif';
import { useParams } from "react-router-dom";
import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Adadose() {
  const location = useParams();
  const [category1, setCategory1] = React.useState('');
  const [category2, setCategory2] = React.useState('');
  const [category3, setCategory3] = React.useState('');
  const [category4, setCategory4] = React.useState('');
  const [category5, setCategory5] = React.useState('');
  const [category6, setCategory6] = React.useState('');
  const [category7, setCategory7] = React.useState('');
  const [category8, setCategory8] = React.useState('');
  const [showrusult, setShowresult] = React.useState(null);
  const[Age,SetAge]=React.useState();
  const[IMC,SetImc]=React.useState();
  const[Hta,setHta]=React.useState();
  const[Loading,setLoading]=React.useState();
  function calculateResult() {
    setShowresult(null)
    const min = 2;
    const max = 6;
    const rand = min + Math.random() * (max - min); 
    

    const calculatedResult = rand;

    setLoading(true)
    setTimeout(() => {
      setShowresult(calculatedResult.toFixed(2));
      setLoading(false);
    }, 20000); 
  }
  return (
    <>
      <div class="topnav" id="myTopnav">
        <a href={"/patient/dossier/" + location.id} class="active">Upload file</a>
        <a href={"/patient/dossier/quiz/" + location.id} class="active">Questionnaire</a>
        <a href={"/patient/dossier/adadose/" + location.id} class="active">Adaptation du dose</a>
        <a href={"/patient/dossier/ListNote/" + location.id} className="active">Notebook</a>
      </div>
      <div>&nbsp;</div>
      <div style={{ display: 'flex', justifyContent: 'space-around', border: 'rgb(12, 156, 182) solid 1px ', borderRadius: '10px' }}>
        <div style={{ marginTop: '2cm', marginLeft: '7cm' }} >
 <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>AGE</label>
                            <Form.Control
                              defaultValue={Age}
                              placeholder="AGE"
                              name="AGE"
                              className="required"
                              type="text"
                              onChange={(e) => {
                                SetAge(e.target.Age);
                              }}
                            ></Form.Control>
                          </Form.Group>
                        
            </Col>
           
          <Box sx={{ minWidth: 300 }}>
         
    
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chosissez CYP2C92</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

                value={category1}
                label="Age"
                onChange={(e) => setCategory1(e.target.value)}
              >
                <MenuItem value={10}>AG</MenuItem>
                <MenuItem value={20}>GG</MenuItem>
                <MenuItem value={30}>AA</MenuItem>
              </Select>
            </FormControl>
            <br clear="all"></br>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chosissez CYP3A4 22</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category2}
                label="Age"
                onChange={(e) => setCategory2(e.target.value)}
              >
                <MenuItem value={10}>AG</MenuItem>
                <MenuItem value={20}>GG</MenuItem>
                <MenuItem value={30}>AA</MenuItem>
              </Select>
            </FormControl><hr></hr>   <br></br>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chosissez CYP3A4 1b</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category3}
                label="Age"
                onChange={(e) => setCategory3(e.target.value)}
              >
                <MenuItem value={10}>AG</MenuItem>
                <MenuItem value={20}>GG</MenuItem>
                <MenuItem value={30}>AA</MenuItem>
              </Select>
            </FormControl>   <br></br>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chosissez ABCB1C3435</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category4}
                label="Age"
                onChange={(e) => setCategory4(e.target.value)}
              >
                <MenuItem value={10}>AG</MenuItem>
                <MenuItem value={20}>GG</MenuItem>
                <MenuItem value={30}>AA</MenuItem>
              </Select>
            </FormControl><hr></hr>   <br></br>
          </Box>

        </div>
        <div style={{ marginTop: '2cm', marginLeft: '1cm', justifyContent: 'space-between', }}>
        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>IMC</label>
                            <Form.Control
                              defaultValue={IMC}
                              placeholder="IMC"
                              name="IMC"
                              className="required"
                              type="Number"
                              onChange={(e) => {
                                SetImc(e.target.IMC);
                              }}
                            ></Form.Control>
                          </Form.Group>
                        
            </Col>
          <Box sx={{ minWidth: 300 }}>

         
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chosissez ABCB1 C1236</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category6}
                label="Age"
                onChange={(e) => setCategory6(e.target.value)}
              >
                <MenuItem value={10}>AG</MenuItem>
                <MenuItem value={20}>GG</MenuItem>
                <MenuItem value={30}>AA</MenuItem>
              </Select>
            </FormControl>    <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chosissez POR*28C>T</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category8}
                label="Age"
                onChange={(e) => setCategory8(e.target.value)}
              >
                <MenuItem value={10}>AG</MenuItem>
                <MenuItem value={20}>GG</MenuItem>
                <MenuItem value={30}>AA</MenuItem>
              </Select>
            </FormControl> <hr></hr>   <br></br>
          
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Diabétique ?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category7}
                label="Age"
                onChange={(e) => setCategory7(e.target.value)}
              >
                <MenuItem value={10}>Oui</MenuItem>
                <MenuItem value={20}>Non</MenuItem>
                
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">HTA?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Hta}
                label="Age"
                onChange={(e) => setHta(e.target.value)}
              >
                <MenuItem value={10}>Oui</MenuItem>
                <MenuItem value={20}>Non</MenuItem>
                
              </Select>
            </FormControl>
            

          </Box>

        </div>
        <hr></hr>
        <br></br>


      </div> 
         <div style={{ textAlign: 'right' }}><Button onClick={calculateResult} style={{ marginTop: '-90px', marginRight: '2cm', backgroundColor: 'rgb(12, 156, 182)' }}>Récuperer</Button ></div>
                <div className="bloc-result">{Loading?
           <div id="view">
           <img src={loader}  className="loader" /></div>:<h1> Résultat :  {showrusult !== null ? showrusult+" Mg" : '0 Mg'}  </h1>}
            </div> 
    </>
  );
}

export default Adadose;
