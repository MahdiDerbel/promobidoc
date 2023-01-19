import React,{ useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Sidebar from "./sidebar2/Sidebar2";

import {getNotebookbyIdPatient,notebookDeleted} from "../../Redux/notebookReduce";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useParams();
  const [entities, setEntities] = React.useState([]);
  const [activeNote, setActiveNote] = useState(false);
  


useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        var i
          var response = await dispatch(getNotebookbyIdPatient(location.id));
          resolve(response.payload);
      }, 0);
    },[]);
  
    promise.then((value) => {
      setEntities(value);
      
    });

  }, [])

  const getActiveNote = () => {
    return entities.find(({ id }) => id === activeNote);
  };
 

  return (
      <>
    <div className="topnav" id="myTopnav">
    <a href={"/patient/dossier/"+location.id}className="active">Upload file</a>
    <a href={"/patient/dossier/quiz/"+location.id}className="active">Questionnaire</a>
    <a href={"/patient/dossier/adadose/"+location.id}className="active">Adaptation du dose</a>
    <a href={"/patient/dossier/ListNote/"+location.id}className="active">Notebook</a>
    
  </div>
    <div className="App">
        
      <Sidebar
        activeNote={activeNote}
        
      />
    </div>
    </>
  );
}

export default App;
