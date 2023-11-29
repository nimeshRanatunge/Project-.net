import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css"


export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //new form
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setisActive] = useState(0);

  //edit form
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [isEditActive, setIsEditActive] = useState(0);

  const empdata = [
    {
      id: 1,
      name: "Nimesh",
      age: 26,
      isActive: 1,
    },
    {
      id: 2,
      name: "Charuni",
      age: 25,
      isActive: 1,
    },
    {
      id: 3,
      name: "Chandrika",
      age: 62,
      isActive: 1,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7065/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    // alert(id);
    axios.get(`https://localhost:7065/api/Employee/${id}`)
    .then((result)=>{
      setEditName(result.data.name);
      setEditAge(result.data.age);
      setIsEditActive(result.data.isActive);
      setEditId(id);
    })
    .catch((error)=>{
      console.log(error)
    })
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
      // alert(id);
      axios.delete(`https://localhost:7065/api/Employee/${id}`)
      .then((result)=>{
        if(result.status === 200){
          toast.success('Employee deleted');
          getData();
        }
      }).catch((error)=>{
        toast.error(error)
      });
    }
  };
  const handleUpdate = () => {
    const url = `https://localhost:7065/api/Employee/${editId}`;
    const data = {
      "id": editId,
      "name": editName,
      "age": editAge,
      "isActive": isEditActive,
    };
    axios.put(url, data).then((result) => {
      handleClose();
      getData();
      clear();
      toast.success('Employee has been added');
    }).catch((error)=>{
      toast.error(error)
    });
  };

  const handleSave = () => {
    const url = "https://localhost:7065/api/Employee";
    const data = {
      "name": name,
      "age": age,
      "isActive": isActive,
    };
    axios.post(url, data).then((result) => {
      getData();
      clear();
      toast.success('Employee has been updated');
    }).catch((error)=>{
      toast.error(error)
    });
  };

  const clear = () => {
    setName("");
    setAge("");
    setisActive(0);
    setEditName("");
    setEditAge("");
    setIsEditActive(0);
    setEditId("");
  };
  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setisActive(1);
    } else {
      setisActive(0);
    }
  };
  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setIsEditActive(1);
    } else {
      setIsEditActive(0);
    }
  };

  return (
    <Fragment>
      <div className="container">
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => handleActiveChange(e)}
              value={isActive}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.isActive}</td>
                <td colSpan={2}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={isEditActive === 1 ? true : false}
                onChange={(e) => handleEditActiveChange(e)}
                value={isEditActive}
              />
              <label>IsActive</label>
            </Col>
            {/* <Col>
              <button className="btn btn-primary">Submit</button>
            </Col> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </Fragment>
  );
}
