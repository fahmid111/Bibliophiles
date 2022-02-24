import React from "react";
import { Link } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../../assets/images/banner031.jpg";
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import "./style.css";

export default function AdminHomePage() {
  return (
    <div>
      <div>
        <NavbarAdmin />
      </div>
      <div class="container-fluid content">
        <div class="row">
        <div class="col-md-10 banner">
        <div className = "head-text">
        <div className = "head-image">
          <img className="photo-a" src = {Banner} alt = "Cover image"/>
        </div>
        <div className = 'text-on-image' style={{marginTop: "20px"}}>
            <h2> <strong> Welcome Back Admin </strong>  </h2>
            <p></p>
            <p><br></br> 
               <h4> <p>good to see you back!</p><p>please choose your actions</p><p>from the right menu</p> </h4>  
            </p><br></br>
        </div>
      </div>
		        </div>
          
          <div class="col-md-2">
            <div class="card rightPanel">
              <div class="card-body">
                <h5 class="menu">
                  <i class="fab fa-mendeley"></i>&nbsp;Menu
                </h5>
                <br></br>
                <Link
                  to={"/manage-books"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Manage Books</p>
                </Link>
                <br></br>
                <Link
                  to={"/manage-authors"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Manage Authors</p>
                </Link>
                <br></br>
                {/* <Link
                  to={"/manage-users"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Manage Users</p>
                </Link>
                <br></br> */}
                <Link
                  to={"/manage-publishers"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Manage Publishers</p>
                </Link>
                <br></br>
                <Link
                  to={"/manage-genre"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Manage Genres</p>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
