import qs from "qs";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import icon from '../../assets/images/admin-icon.jpg';
import toastFun from "../../components/toast/toast";
import httpCommonGet from "../../HTTP/httpCommonParam.js";
import httpCommonURL from "../../HTTP/httpCommonURL.js";
import NavbarAdmin from "../Navbar/NavbarAdmin.js";
import './style.css';



const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
  
};

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState({});  
  const [showForm, setShowForm] = useState(false);

  const showTheForm = () => {
    setShowForm(!showForm);
  } 

  useEffect(() => {
      getAdmin();
  }, []);


  const getAdmin = async () => {
    try {
      let getAdmin = await httpCommonGet.get(`/decode`);
      setAdmin(getAdmin.data[0]);
      // console.log(getAdmin.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAdmin = async (e) => {
    e.preventDefault();
    if (!admin.FIRST_NAME || !admin.LAST_NAME) {
      toastFun("Fill First Name and Last Name!", 2);
    } else if (admin.PHONE_NUMBER && admin.PHONE_NUMBER.length>14) {
      toastFun("Length of phone number should be less than 14", 2);
    } else if(!admin.EMAIL) {
      toastFun("Fill email", 2);
    } 

    else {
      try {
        var data = qs.stringify(admin);
        const tempAdmin = await httpCommonURL.put("/updateAdmin", data);
        setAdmin(admin);
        //window.location.reload()
        toastFun("Updated Successfully!", 1);
      } catch (err) {
        toastFun("Failed to Update Profile", 2);
        console.log(err);
      }
    }
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "70px" }} />
    <div>
      <NavbarAdmin></NavbarAdmin>
    </div>
    <Container className="main-container-a">
      <Row>
        <Col className="col-md-4 left-cont">
          <img
            src={icon}
            alt=""
            width = "320"
            height = "240"
          />
        </Col>
        <Col className="col-md-8 right-cont border">
          <h2 class="d-inline">{admin.FIRST_NAME + " " + admin.LAST_NAME} </h2>(<h6 class="d-inline">{admin.ADMIN_NAME}</h6>)
          <Link onClick={showTheForm} style={{float: "right", fontSize:"25px"}} title="Edit"><i class="fas fa-pen"></i></Link>
          {/* <Button class = "d-flex"as="input" type="submit" value="Edit Profile" onClick={showTheForm} /> */}

          <hr></hr>
          <ul>
            <li>Address: {admin.ADDRESS}</li>
            <li>Email: {admin.EMAIL}</li>
            <li>Phone Number: {admin.PHONE_NUMBER}</li>
            <li>Details: {admin.DETAILS}</li>
            
          </ul>

        </Col>
      </Row>
    </Container>
    <p></p>
    {showForm && (
    <div class="container-fluid content">
        <div class="row">
          <div class="col-md-10 create-container">
            <div class="col-md-4"></div>
            <div class="col-md-6 create-form" id="update-admin">
              <h4> Edit Profile </h4>
              <form id="update-admin" onSubmit={updateAdmin}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name*"
                    name="admin-first-name"
                    value={admin.FIRST_NAME}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        FIRST_NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name*"
                    name="admin-last-name"
                    value={admin.LAST_NAME}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        LAST_NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    name="admin-address"
                    value={admin.ADDRESS}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email*"
                    name="admin-email"
                    value={admin.EMAIL}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        EMAIL: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone number"
                    name="admin-phone-number"
                    value={admin.PHONE_NUMBER}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        PHONE_NUMBER: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Details"
                    name="admin-details"
                    value={admin.DETAILS}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        DETAILS: e.target.value,
                      })
                    }
                  />
                </div>

                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Update" />
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
      )}
      <p></p>
      <br></br>
      <br></br>
    </div>
  
  );
}