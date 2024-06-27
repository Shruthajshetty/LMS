import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Myresource() {
  const [fdata, setFData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000").then((res) => {
      console.log(res.data);
      setFData(res.data);
    });
  }, []);

  //******************delete db data */
  const deleteHandler = (e) => {
    console.log(e);
    Axios.post("http://localhost:4000/delete", { id: e }).then((res) => {
      let ack = res.data;
      if (ack === "success") {
        alert("data deleted not succesful");
      } else {
        alert("data deleted succesful");
      }
    });
  };
//
  return (
    <>
    
      <ul style={{backgroundColor:"white"}}>
        <li>
          <Link to={{ pathname: "/home" }}>Home</Link>
        </li>
        
        <li>
          <Link to={{ pathname: "/Addresource" }}>Add Resource</Link>
        </li>
        <li>
          <Link to={{ pathname: "/about" }}>About Us</Link>
        </li>
      </ul>
      <hr></hr>
      <h4><div style={{ backgroundColor: "white", width: "10%" }}>E-resource</div></h4>
      

      <div>
        {fdata.map((sdata) => {
          return (
            <div
              style={{
                backgroundColor: "pink",
                width: "auto",
                float: "left",
                margin: "10px",
              }}
              key={sdata._id}
            >
              <h3
              style={{
                color: "black",
                 margin: "10px",
               }} >{sdata.title}</h3>
              <br></br>
             <h4 style={{
                color: "purple",
                 margin: "10px",
               }}> {sdata.content}</h4>
              <br></br>

             <h7 style={{
               color: "blue",
                margin: "10px",
              }} >Copy this Youtube link to learn :&nbsp; {sdata.vediolink}</h7> 
              <br></br>
              <h5> &nbsp;&nbsp;&nbsp;By-{sdata.author}</h5>
              <br></br>
              <button type="submit" onClick={() => deleteHandler(sdata._id)}>
                delete
              </button>
              --
              <Link to={{ pathname: `/update/${sdata._id}` }}>Update</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Myresource;
