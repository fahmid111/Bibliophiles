import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function PageFooter({ color }) {
  return (
    <>
      <footer class="footer-distributed">
        <div class="footer">
          <p>
            <h5>CSE 216 Database Project &copy; 2022</h5>
          </p>
          <br></br>

          <div class="container-fluid footer-links">
            <div class="row">
              <div class="col-md-2"></div>
              {/* <div class="col-md-2"></div> */}
              <div class="col-md-4">
                <p class="footer-links">Abu Humayed Azim Fahmid</p>
                <p class="footer-links">1805036</p>
                <p class="footer-links"><em><a href="mailto:1805036@ugrad.cse.buet.ac.bd">1805036@ugrad.cse.buet.ac.bd</a></em></p>
              </div>
              <div class="col-md-4">
                <p class="footer-links">Asif Shahriar</p>
                <p class="footer-links">1805040</p>
                <p class="footer-links"><em><a href="mailto:1805040@ugrad.cse.buet.ac.bd">1805040@ugrad.cse.buet.ac.bd</a></em></p>              
                </div>
              {/* <div class="col-md-2"></div> */}
              <div class="col-md-2"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
