
//User
import ListUser from "./Pages/Settings/User/ListUser";
import AjouterUser from "./Pages/Settings/User/AjouterUser";
//User
import ListEquipe from "./Pages/Equipe/ListEquipe";
import AjouterEquipe from "./Pages/Equipe/AjouterEquipe";
//Role
import ListRole from "./Pages/Settings/Role/ListRole";
import AjouterRole from "./Pages/Settings/Role/AjouterRole";
//Settings
import Settings from "./Pages/Settings";

import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
import DossierPatient from "./Pages/DossierPatient/DossierPatient";
import DataVisualization from "./Pages/DataVisualization/Viz";
import AjouterPatient from "./Pages/DossierPatient/AjouterPatient";
import Management from "./Pages/DossierPatient/management";
import Quiz from "./Pages/DossierPatient/quiz";
import Adadose from "./Pages/DossierPatient/adadose";
import FileUpload from "./Pages/DossierPatient/FileUpload";

import Main from "./Pages/Notebook/main/Main";
import App from "./Pages/Notebook/App";
import AddNote from "./Pages/Notebook2/AddNote";
import ListNote from "./Pages/Notebook2/ListNote";
import App2 from "./Pages/Notebook2/App2"



//DashBoard

//Secteur
var routes = [
  {
    collapse: true,
    path: "/parametre",
    name: "Parametre",
    state: "openPages2",
    icon: "fas fa-cogs",
    role: [1],
    views: [
      {
        path: "/roleList",
        name: "Role",
        icon: "fas fa-users-cog",
        component: ListRole,
        role: [1],
        element: <ListRole />,
      },
      {
        path: "/utilisateurListe",
        name: "Utilisateur",
        icon: "fas fa-users",
        component: ListUser,
        role: [1],
        element: <ListUser />,
      },
     
    ],
  },
  {
    path: "/DossierPatient",
    name: "Dossier Patient",
    icon: "fas fa-users",
    component: DossierPatient,
    role: [1,2],
    element: <DossierPatient />,
  },

  {
    path: "/staffListe",
    name: "List d'équipe",
    icon: "fas fa-users",
    component: ListEquipe,
    role: [1,2],
    element: <ListEquipe />,
  },
  {
    path: "/DataVisualization",
    name: "Visualization des donneés",
    icon: "fas fa-users",
    component: DataVisualization,
    role: [1,2],
    element: <DataVisualization />,
  },
  
  
  /* hidden */
  {
    path: "/ajouterUtilisateur",
    name: "Ajouter utilisateur",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterUser,
    className: "hidden",
    role: [1],
    element: <AjouterUser />,
  },
  {
    path: "/utilisateur/update/:id",
    name: "Modifier utilisateur",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterUser,
    role: [1],
    className: "hidden",
    element: <AjouterUser />,
  },
  {
    path: "/ajouterStaff",
    name: "Ajouter staff",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterEquipe,
    className: "hidden",
    role: [1],
    element: <AjouterEquipe />,
  },
  {
    path: "/staff/update/:id",
    name: "Modifier staff",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterEquipe,
    role: [1],
    className: "hidden",
    element: <AjouterEquipe />,
  },
  {
    path: "/ajouterRole",
    name: "Ajouter role",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterRole,
    className: "hidden",
    role: [1],
    element: <AjouterRole />,
  },
  {
    path: "/role/update/:id",
    name: "Modifier role",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterRole,
    role: [1],
    className: "hidden",
    element: <AjouterRole />,
  },
  {
    path: "/patient/update/:id",
    name: "Modifier patient",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterPatient,
    role: [1],
    className: "hidden",
    element: <AjouterPatient />,
  },
  {
    path: "/Notebook/update/:id",
    name: "Modifier Note",
    icon: "nc-icon nc-ruler-pencil",
    component: AddNote,
    role: [1],
    className: "hidden",
    element: <AddNote />,
  },
  {
    path: "/settings",
    name: "Settings",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: Settings,
    element: <Settings />,
  },
  {
    path: "/*",
    name: "404 not found",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: NotFound,
    element: <NotFound />,
  },
  {
    path: "/profile",
    name: "profile",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: Profile,
    element: <Profile />,
  },
  {
    path: "/ajouterPatient",
    name: "Ajouter patient",
    icon: "nc-icon nc-ruler-pencil",
    component: AjouterPatient,
    className: "hidden",
    role: [1],
    element: <AjouterPatient />,
  },
  {
    path: "/patient/dossier/quiz/:id",
    name: "quiz",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: Quiz,
    element: <Quiz />,
  },
  {
    path: "/patient/dossier/adadose/:id",
    name: "adadose",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: Adadose,
    element: <Adadose />,
  },
  {
    path: "/patient/dossier/:id",
    name: "patient",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: Management,
    element: <Management />,
  },
  {
    path: "/patient/dossier/FileUpload/:id",
    name: "FileUpload",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: FileUpload,
    element: <FileUpload />,
  },
  

  {
    path: "/patient/dossier/ListNote/:id",
    name: "ListNote",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: App2,
    element: <App2 />,
  },
  {
    path: "/patient/dossier/AddNote/:id",
    name: "AddNote",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: AddNote,
    element: <AddNote />,
  },
  {
    path: "/Notebook",
    name: "Notebook",
    mini: "LP",
    role: [20],
    className: "hidden",
    component: App,
    element: <App />,
  },
  
  
  /* end root hidden */
];
export default routes;
