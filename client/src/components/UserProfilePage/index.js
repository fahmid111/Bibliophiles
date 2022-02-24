import qs from "qs";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import icon from '../../assets/images/user-icon.jpg';
import toastFun from "../../components/toast/toast";
import httpCommonGet from "../../HTTP/httpCommonParam.js";
import httpCommonPut from "../../HTTP/httpCommonURL";
import Slide02 from "../HomePage/bookSlideShow";
import { HomeWrapper } from "../HomePage/style.js";
import NavbarHomePage from "../Navbar/NavbarHomePage";
import Slides from "./Slides";
import './style.css';


const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
  
};

export default function UserProfilePage() {
  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [ratedBooks, setUserRatedBooks] = useState([]);
  const [reviewedBooks, setUserReviewedBooks] = useState([]);

  const showTheForm = () => {
    setShowForm(!showForm);
  } 

  useEffect(() => {
    getUser();
    getUserRatedBooks();
    getUserReviewedBooks();
  }, []);

  const getUserRatedBooks = async () => {
    try {
      let getRatedBooks = await httpCommonGet.get(
        "/getUserRatedBooks"
        // "/book"
      );
      setUserRatedBooks(getRatedBooks.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserReviewedBooks = async () => {
    try {
      let getReviewedBooks = await httpCommonGet.get(
        "/getUserReviewedBooks"
        // "/book"
      );
      setUserReviewedBooks(getReviewedBooks.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      let getUser = await httpCommonGet.get(`/decode`);
      setUser(getUser.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (!user.FIRST_NAME || !user.LAST_NAME) {
      toastFun("Fill First Name and Last Name!", 2);
    } else if (user.PHONE_NUMBER && user.PHONE_NUMBER.length>14) {
      toastFun("Length of phone number should be less than 14", 2);
    } else if(!user.EMAIL) {
      toastFun("Fill email", 2);
    } 

    
    else {
      console.log(user);
      try {
        var data = qs.stringify(user);
        const tempUser = await httpCommonPut.put("/updateUser", data);
        setUser(user);
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
        <NavbarHomePage></NavbarHomePage>
      </div>
      <Container className="main-container-u">
        <Row>
          <Col className="col-md-4 left-cont">
            <img src={icon} alt="" width="320" height="240" />
          </Col>
          <Col className="col-md-8 right-cont border">
            <h2 class="d-inline">{user.FIRST_NAME + " " + user.LAST_NAME} </h2>(
            <h6 class="d-inline">{user.USER_NAME}</h6>)
            <Link onClick={showTheForm} style={{float: "right", fontSize:"25px"}} title="Edit"><i class="fas fa-pen"></i></Link>

            {/* <Button as="input" type="submit" value="Submit" onClick={showTheForm} /> */}
            <hr></hr>
            <ul>
              <li>Address: {user.ADDRESS}</li>
              <li>Email: {user.EMAIL}</li>
              <li>Phone Number: {user.PHONE_NUMBER}</li>
              <li>Details: {user.DETAILS}</li>
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
            <div class="col-md-6 create-form" id="update-user">
              <h4> Edit Profile </h4>
              <form id="update-user" onSubmit={updateUser}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name*"
                    name="user-first-name"
                    value={user.FIRST_NAME}
                    onChange={(e) =>
                      setUser({
                        ...user,
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
                    name="user-last-name"
                    value={user.LAST_NAME}
                    onChange={(e) =>
                      setUser({
                        ...user,
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
                    name="user-address"
                    value={user.ADDRESS}
                    onChange={(e) =>
                      setUser({
                        ...user,
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
                    name="user-email"
                    value={user.EMAIL}
                    onChange={(e) =>
                      setUser({
                        ...user,
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
                    name="user-phone-number"
                    value={user.PHONE_NUMBER}
                    onChange={(e) =>
                      setUser({
                        ...user,
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
                    name="user-details"
                    value={user.DETAILS}
                    onChange={(e) =>
                      setUser({
                        ...user,
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
        <br></br>
      </div>
      )}
      <p></p>
      <Container>
          <h4 class="text-muted" style={{textAlign: "center", marginLeft:"-0px", marginTop: "10px"}}>
              <em>Your Rated Books
              </em></h4><hr></hr>
      </Container>
      <div class="col-md-10 book-container-user">
      <HomeWrapper id="rated_books">
            <Container>
              <br></br>
              <Slides book={ratedBooks} />
            </Container>
          </HomeWrapper>
      </div>
      <p></p>
      <Container>
          <h4 class="text-muted" style={{textAlign: "center", marginLeft:"-0px", marginTop: "10px"}}>
              <em>Books You Reviewed
              </em></h4><hr></hr>
      </Container>
      <div class="col-md-10 book-container-user">
      <HomeWrapper id="rev_books">
            <Container>
              <br></br>
              <Slide02 book={reviewedBooks} inf = {true} />
            </Container>
          </HomeWrapper>
      </div>
      <br></br>
    </div>
  );
}