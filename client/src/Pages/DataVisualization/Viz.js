import React from 'react';
import Iframe from 'react-iframe';

function Viz() {
  return (
    <div className="App">
     <Iframe url="https://app.powerbi.com/view?r=eyJrIjoiY2JkMGY4YWYtOTZjMS00YmQ1LTlmMmQtZjZhMmQ0MWUyYzczIiwidCI6IjlmNGViODQwLTA0ODctNDE2Ny04NmJkLTNkNWM4NTE1OGI2YyJ9&pageName=ReportSection"
        width="1300px"
        height="700px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
    </div>
  );
}

export default Viz;