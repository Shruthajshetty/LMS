import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import Axios from "axios";
function AddResource() {
    const myStyle={
    backgroundColor:"pink"
  }
const [fdata, setFdata] = useState({
  title: "",
  content: "",
  vediolink:"",
  author: "",
});
const [msg, setMsg] = useState();

//*************change handler */
const ChangeHandler = (e) => {
  let name1 = e.target.name;
  let val = e.target.value;
  setFdata({ ...fdata, [name1]: val });
};

//*************submit handler */
const SubmitHandler = (e) => {
  e.preventDefault();
  Axios.post("http://localhost:4000/ins", { fdata }).then((res) => {
    let ack = res.data;
    if (ack === "success") {
      setMsg("Data inserted successful");
      console.log(msg);
      alert("Thank u for helping others to learn");
    } else {
      setMsg("Data not inserted ");
      console.log(msg);
      alert("data not inserted");
    }
  });
};
return (
  <>
    <ul style={myStyle}>
      <li>
        <Link to={{ pathname: "/home" }}>Home</Link>
      </li>
      <li>
        <Link to={{ pathname: "/resource" }}>Learning Resources</Link>
      </li>
      
      <li>
        <Link to={{ pathname: "/about" }}>About Us</Link>
      </li>
    </ul>

    <hr></hr>
   <center><div style={{
              backgroundColor: "pink",
              width: "20%",
              margin: "10px",
            }}><h4>Enter  The Educational Resources</h4></div></center> 
<br></br>
    <center><form onSubmit={SubmitHandler}>
      <label > &nbsp;  &nbsp; &nbsp; &nbsp;Title:  &nbsp;  &nbsp; </label>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={fdata.title}
        onChange={ChangeHandler}
      />
      <br></br>
      <br></br>

      <label>&nbsp;Content:  &nbsp; &nbsp;    </label>
      <textarea type ="text"
      name="content"
      placeholder="Enter description"
      value={fdata.content}
      onChange={ChangeHandler}
      > </textarea>
      <br></br>
      <br></br>
      <label> &nbsp; &nbsp;&nbsp;&nbsp;Vedio: &nbsp; &nbsp; &nbsp;</label>
      <input
        type="url"
        name="vediolink"
        placeholder="Place vediolink"
        value={fdata.vediolink}
        onChange={ChangeHandler}
      />
      <br></br>
      <br></br>
      <label> &nbsp; &nbsp;Author:  &nbsp; &nbsp;&nbsp;</label>
      <input
        type="text"
        name="author"
        placeholder="Enter your name"
        value={fdata.author}
        onChange={ChangeHandler}
      />

      <br></br>
      <br></br>
      <button type="submit">Insert</button>
    </form>
    </center>
  </>
  
);
}

export default AddResource;