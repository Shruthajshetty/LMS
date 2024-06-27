import React from "react";
import { Link } from "react-router-dom";


export default function about() {
  const style = {
    margin: "auto",
    padding: "10% 35% 10% 15%",
    color: "white"
}
  return (
    <>
      
     
      <div style={style}>
      
      <div style={{"font-size": "96px"}}>
          About Us
      </div>
      
      <div style={{"font-size": "36px"}}>
      It all began with a small team of engineers and a simple idea. We aim to create comprehensive eLearning ecosystem. We innovate every day to make LMS even more powerful and wonderful to use.
      </div>
      <br />
  </div>
  <hr></hr>
  <ul style={{backgroundColor:"pink"}}>
        <li>
          <Link to={{ pathname: "/home" }}>Home</Link>
        </li>
        <li>
          <Link to={{ pathname: "/Addresource" }}>Add Resource</Link>
        </li>
        <li>
         
          <Link to={{ pathname: "/resource" }}>Learning Resources</Link>
        </li>
       
       
      </ul>
    </>
  );
}
