import React from "react";
import { Link } from "react-router-dom";

function LandingFrameMessage() {
  const style = {
      margin: "auto",
      padding: "10% 35% 10% 15%",
      color: "white"
  }
  return <div style={style}>
      
      <div style={{"font-size": "96px"}}>
          WELCOME 
      </div>
      
      <div style={{"font-size": "36px"}}>
          This is the eLearning platform that you are looking for!! 
      </div>
      <br />
  </div>
}

function Home() {
 



  return (
    <>
   <LandingFrameMessage />
      <ul style={{backgroundColor:"pink"}} >
        
        <li>
          <Link to={{ pathname: "/resource" }}>Learning Resources</Link>
        </li>
         <li>
          <Link to={{ pathname: "/Addresource" }}>Add Resource</Link>
        </li>
        <li>
          <Link to={{ pathname: "/about" }}>About Us</Link>
        </li>
      </ul>
   
     
     
    </>
    
  );
}

export default Home;
