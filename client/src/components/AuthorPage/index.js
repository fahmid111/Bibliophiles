import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import icon from "../../assets/images/author-icon.jpg";
import httpCommonGet from "../../HTTP/httpCommonParam.js";
import Slides from "../Bookshelves/Slides";
import NavbarHomePage from "../Navbar/NavbarHomePage";
import "./style.css";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function AuthorPage(props) {
  const [author, setAuthor] = useState({});
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    getAuthor();
    getAuthorBooks();
  }, []);

  const getAuthor = async () => {
    try {
      let getAuthor = await httpCommonGet.get(
        `/getAuthor?PERSON_ID=${props.match.params.AUTHOR_ID}`
      );
      setAuthor(getAuthor.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getAuthorBooks = async () => {
    try {
      let getAuthorBooks = await httpCommonGet.get(
        `/getAuthorBooks?PERSON_ID=${props.match.params.AUTHOR_ID}`
        // "/book"
      );
      setAuthorBooks(getAuthorBooks.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <NavbarHomePage />
      </div>
      <Container className="main-container-auth">
        <Row>
          <Col className="col-md-4 left-cont">
            <img src={icon} alt="" width="320" height="240" />
          </Col>
          <Col className="col-md-8 right-cont border">
            <h2 class="d-inline">
              {author.FIRST_NAME + " " + author.LAST_NAME}{" "}
            </h2>
            <hr></hr>
            <ul>
              <li>Address: {author.ADDRESS}</li>
              <li>Email: {author.EMAIL}</li>
              <li>Phone Number: {author.PHONE_NUMBER}</li>
              <li>Website: {author.WEB_ADDRESS}</li>
              <li>Details: {author.DETAILS}</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container>
          <h4 class="text-muted" style={{textAlign: "center", marginLeft:"-0px", marginTop: "10px"}}>
              <em>Books by {author.FIRST_NAME + " " + author.LAST_NAME}
              </em></h4><hr></hr>
      </Container>
      <div class="col-md-10 book-container-auth">
        <Slides book={authorBooks} />
      </div>
    </div>
  );
}
