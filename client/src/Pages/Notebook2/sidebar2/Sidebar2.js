import React,{useEffect,useRef} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {getNotebookbyIdPatient,notebookDeleted} from "../../../Redux/notebookReduce";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
//store.dispatch(fetchuser());

// core components
function Notebook() {
 const location = useParams();

  const dispatch = useDispatch();
  const [alert, setAlert]  = React.useState(null);
  const [entities, setEntities] = React.useState([]);
  const notificationAlertRef = React.useRef(null);
  const [activeNote, setActiveNote] = React.useState(false);
 // const[CurrentNote,setCurrentNote]=React.useState([{title:"Empty",content:"Empty"}])
  const [activetitle, setActivetitle] = React.useState("Empty");
  const [activecontent, setActivecontent] = React.useState("Empty");
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
  function update() {
    window.location.href ="/Notebook/update/"+location.id
  }
  
  
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        var i
          var response = await dispatch(getNotebookbyIdPatient(location.id));
          resolve(response.payload);
      }, 0);
    });
  
    promise.then((value) => {
      setEntities(value);
    });

  }, [])
  
 

  function handleClick(content,title) {
    setActiveNote(true)
    setActivecontent(content);
    setActivetitle(title);
  
  }

  
  if (!activeNote) return <div className="app-sidebar">
        
  <div className="app-sidebar-header">
    <h1>Notes</h1>
    <button onClick={ajouter}>Add</button>
  </div>
  <div className="app-sidebar-notes">
    {entities.map(({ id, title, content,idpatient }, i) => (
      <div
        className={`app-sidebar-note ${id === activeNote && "active"}`}
        onClick={() => handleClick(content,title)
    }
      >
          
        <div className="sidebar-note-title">
            <div><strong>{title}</strong></div>
          <button onClick={(e) => deleteNotebook(id)}>Delete</button>
          
        </div>
       

        <p>{content&& content.substr(0, 100) + "..."}</p>
        
      </div>
    ))}
  </div>
</div>;
  return (
      
<>

 
<div className="app-sidebar">
        
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={ajouter}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {entities.map(({ id, title, content,idpatient }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => handleClick(content,title)
        }
          >
              
            <div className="sidebar-note-title">
                <div><strong>{title}</strong></div>
              <button onClick={(e) => deleteNotebook(id)}>Delete</button>
              
            </div>
           

            <p>{content&& content.substr(0, 100) + "..."}</p>
            
          </div>
        ))}
      </div>
    </div>
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activetitle}
          
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activecontent}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
    </>
    
  );
}

export default Notebook;
