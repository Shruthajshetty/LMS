import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useState } from "react";
import Axios from "axios";

function Update() {
  const [fdata, setFdata] = useState({
    title: "",
    content: "",
    vediolink:"",
    author: "",
  });

  const params = useParams(); //get id from url
  let id = params.id;

  //*****fetch data  */
  useEffect(() => {
    Axios.post("http://localhost:4000/get", { id: id }).then((res) => {
      let data = res.data;
      console.log(data);
      setFdata(...data);
    });
  }, [id]);

  //*************change handler */
  const ChangeHandler = (e) => {
    let name1 = e.target.name;
    let val = e.target.value;
    setFdata({ ...fdata, [name1]: val });
  };

  //*************submit handler */
  const UpdateHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/update", fdata).then((res) => {
      let ack = res.data;
      if (ack === "success") {
        alert("data inserted successfully");
      } else {
        alert("data not inserted");
      }
    });
  };
  //"/Addresource" element={<AddResource />
  return (
    <>
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
        <li>
          <Link to={{ pathname: "/about" }}>About Us</Link>
        </li>
      </ul>

      <hr></hr>
      <div>Enter  the Resource</div>

      <form onSubmit={UpdateHandler}>
        <label>title: </label>
        <input
          type="text"
          name="title"
          placeholder="enter title"
          value={fdata.title}
          onChange={ChangeHandler}
        />
        <br></br>

        <label>content: </label>
        <input
          type="text"
          name="content"
          value={fdata.content}
          onChange={ChangeHandler}
        />
        <br></br>
        <label>Vedio: </label>
        <input
          type="url"
          name="vediolink"
          value={fdata.vediolink}
          onChange={ChangeHandler}
        />
        <br></br>

        <label>author: </label>
        <input
          type="text"
          name="author"
          value={fdata.author}
          onChange={ChangeHandler}
        />
        <br></br>

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default Update;
