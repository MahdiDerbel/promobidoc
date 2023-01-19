import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/scss/style.scss?v=2.0.0";
import "./Pages/Notebook2/App.css"
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import routes from "./routes.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import AdminNavbar from "./components/Navbars/AdminNavbar.js";
import LoginPage from "./Pages/Settings/User/LoginPage.js";
import AdminFooter from "./components/Footers/AdminFooter.js";
import jwt_decode from "jwt-decode";
import { getSettings } from "./Redux/settingsReduce";
store.dispatch(getSettings(1));
var token = "";
var loginStorage = null;
var idrole = null;
var hrefURL = window.location.pathname;
function role() {
  token = localStorage.getItem("x-access-token");
  if(token !== null){
    var decoded = jwt_decode(token);
    loginStorage = decoded.userauth.login;
    idrole = decoded.userauth.id_role;
  }
  if(hrefURL==="/login")
    document.title = "login";
}
/* document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
document.onkeydown = function(e) {
  if(e.keyCode === 123) {
    e.preventDefault();
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
    e.preventDefault();
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
    e.preventDefault();
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
    e.preventDefault();
  }
  if(e.ctrlKey && e.keyCode === 'S'.charCodeAt(0)) {
    e.preventDefault();
  }
  if(e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
    e.preventDefault();
  }
} */
role();
const getRoutes = (routes) => {
  return routes.map((prop,key) => 
  {
    if (prop.collapse) {
      return getRoutes(prop.views);
    }
      if(prop.role.includes(idrole) || prop.role.includes(20))
       return (
        <Route
          path={prop.path}
          key={key}
          component={prop.component}
          element={prop.element}
        />
      );
    return null;
  });
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {loginStorage !==null?
        <div className="wrapper">
          <Sidebar routes={routes} />
          <div className="main-panel">
            <AdminNavbar />
            <div className={"content display-"+hrefURL.replace('/', '')}>
            
              <Routes>
                <Route path="/" element={<Navigate replace to="/profile" />} />
                {getRoutes(routes)}
              </Routes>
            </div>
            <AdminFooter />
            <div className="close-layer"
              onClick={() =>
                document.documentElement.classList.toggle("nav-open")
              }
            />
          </div>
        </div>
      :
      
      <div className="wrapper wrapper-full-page">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/*' element={<Navigate replace to="/login" />} />
        </Routes>
      </div> 
      }
        
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
