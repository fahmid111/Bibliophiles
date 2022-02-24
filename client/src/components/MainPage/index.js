import qs from "qs";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../assets/images/banner.jpg";
import httpCommon from "../../HTTP/httpCommonURL.js";
import PageFooter from "../Footer";
import NavbarMainPage from "../Navbar/NavbarMainPage";
import toastFun from "../toast/toast";
import "./MainPage.css";


export default function MainPage() {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [userLogin, setUserLogin] = useState({});
  const [adminLogin, setAdminLogin] = useState({});

  async function postUser(e) {
    e.preventDefault();
    if (!user.EMAIL || !user.FIRST_NAME || !user.LAST_NAME || !user.USER_NAME || !user.PASSWORD) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    }else if (user.PHONE_NUMBER && user.PHONE_NUMBER.length>14) {
      toastFun("Phone Number Must Not Exceed 14 Characters (Including Spaces)", 2);
      return;
    }
    try {
      var data = qs.stringify(user);
      const getUserToken = await httpCommon.post("/user/signup", data);
      sessionStorage.setItem("token", getUserToken.data.token);
      if (getUserToken.data.auth) {
        window.location.replace("/user-homepage");
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      toastFun("Failed to Register... Try Again", 2);
      console.log(error);
    }
  }

  async function loginUser(e) {
    e.preventDefault();
    if (!userLogin.USER_NAME || !userLogin.PASSWORD) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    }
    try {
      var data = qs.stringify(userLogin);
      const getUserToken = await httpCommon.post("/user/login", data);
      sessionStorage.setItem("token", getUserToken.data.token);
      if (getUserToken.data.auth) {
        window.location.replace("/user-homepage");
      } else {
        toastFun("Username or Password is Wrong", 2);
        window.location.replace("/");
      }
    } catch (error) {
      toastFun("Username or Password is Wrong", 2);
      console.log(error);
    }
  }

  async function postAdmin(e) {
    e.preventDefault();
    if (!admin.EMAIL || !admin.FIRST_NAME || !admin.LAST_NAME || !admin.ADMIN_NAME || !admin.PASSWORD) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    }else if (admin.PHONE_NUMBER && admin.PHONE_NUMBER.length>14) {
      toastFun("Phone Number Must Not Exceed 14 Characters (Including Spaces)", 2);
      return;
    }
    try {
      var data = qs.stringify(admin);
      const getAdminToken = await httpCommon.post("/admin/signup", data);
      sessionStorage.setItem("token", getAdminToken.data.token);
      if (getAdminToken.data.auth) {
        window.location.replace("/admin-homepage");
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      toastFun("Failed to Register... Try Again", 2);
      console.log(error);
    }
  }

  async function loginAdmin(e) {
    e.preventDefault();
    if (!adminLogin.ADMIN_NAME || !adminLogin.PASSWORD) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    }
    try {
      var data = qs.stringify(adminLogin);
      const getAdminToken = await httpCommon.post("/admin/login", data);
      sessionStorage.setItem("token", getAdminToken.data.token);
      if (getAdminToken.data.auth) {
        window.location.replace("/admin-homepage");
      } else {
        toastFun("Username or Password is Wrong", 2);
        window.location.replace("/");
      }
    } catch (error) {
      toastFun("Username or Password is Wrong", 2);
      console.log(error);
    }
  }

  return (
    <div>
      <ToastContainer style={{ marginTop: "70px" }} />

      <div>
        <NavbarMainPage />
      </div>
      <div className="head-text">
        <div className="head-image">
          <img className="photo" src={Banner} alt="Cover image" />
        </div>
        <div className="text-on-image">
          <h1>
            {" "}
            <strong> Welcome to Bibliophiles </strong>{" "}
          </h1>
          <p></p>
          <p>
            <h4>
              {" "}
              <p>Explore, Critique, Personalize and</p>
              <p>Create a Bibliophile's Paradise</p>
              <p>And live on it!</p>{" "}
            </h4>
          </p>
          {/* <p>
                <a href="#admin">
                <button type="button" class="btn btn-primary btn-lg">Get Started as Admin</button>
                </a>
                </p>
                <p>
                <a href="#reader">
                <button type="button" class="btn btn-primary btn-lg">Get Started as Reader</button>
                </a>
                </p> */}
        </div>
      </div>

      <br></br>
      <div class="container login-container" id="admin">
        <div class="col-lg-12 mbr-col-md-10">
          <div class="wrap">
            <div class="text-wrap vcenter">
              <h3 class="mbr-fonts-style mbr-bold mbr-section-title3 display-5">
                <i class="fas fa-user-cog"></i>&nbsp;&nbsp;&nbsp;Admin Section
              </h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 login-form-1">
            <h4>Login as Admin</h4>
            <form onSubmit={loginAdmin} id="admin-login">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="username *"
                  name="admin-name"
                  onChange={(e) =>
                    setAdminLogin({ ...adminLogin, ADMIN_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="password *"
                  name="password"
                  onChange={(e) =>
                    setAdminLogin({ ...adminLogin, PASSWORD: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input type="submit" class="btnSubmit" value="Login" />
              </div>
            </form>
          </div>
          <div class="col-md-6 login-form-2">
            <h4>Signup as Admin</h4>
            <form onSubmit={postAdmin} id="admin-signup">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="first name *"
                  name="first-name"
                  onChange={(e) =>
                    setAdmin({ ...admin, FIRST_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="last name *"
                  name="last-name"
                  onChange={(e) =>
                    setAdmin({ ...admin, LAST_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="email*"
                  name="email"
                  onChange={(e) =>
                    setAdmin({ ...admin, EMAIL: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="address"
                  name="address"
                  onChange={(e) =>
                    setAdmin({ ...admin, ADDRESS: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="phone number"
                  name="phone-number"
                  onChange={(e) =>
                    setAdmin({ ...admin, PHONE_NUMBER: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="details"
                  name="details"
                  onChange={(e) =>
                    setAdmin({ ...admin, DETAILS: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="username *"
                  name="admin-name"
                  onChange={(e) =>
                    setAdmin({ ...admin, ADMIN_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="password *"
                  name="password"
                  onChange={(e) =>
                    setAdmin({ ...admin, PASSWORD: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input type="submit" class="btnSubmit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <br></br>
      <div class="container login-container" id="reader">
        <div class="col-lg-12 mbr-col-md-10">
          <div class="wrap">
            <div class="text-wrap vcenter">
              <h3 class="mbr-fonts-style mbr-bold mbr-section-title3 display-5">
                <i class="fas fa-book-reader"></i>&nbsp;&nbsp;&nbsp;Reader
                Section
              </h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 login-form-1">
            <h4>Login as Reader</h4>
            <form onSubmit={loginUser} id="reader-login">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="username *"
                  name="user-name"
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, USER_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="password *"
                  name="password"
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, PASSWORD: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input type="submit" class="btnSubmit" value="Login" />
              </div>
            </form>
          </div>
          <div class="col-md-6 login-form-2">
            <h4>Signup as Reader</h4>
            <form onSubmit={postUser} id="reader-signup">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="first name *"
                  name="first-name"
                  onChange={(e) =>
                    setUser({ ...user, FIRST_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="last name *"
                  name="last-name"
                  onChange={(e) =>
                    setUser({ ...user, LAST_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="email*"
                  name="email"
                  onChange={(e) => setUser({ ...user, EMAIL: e.target.value })}
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="address"
                  name="address"
                  onChange={(e) =>
                    setUser({ ...user, ADDRESS: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="phone number"
                  name="phone-number"
                  onChange={(e) =>
                    setUser({ ...user, PHONE_NUMBER: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="details "
                  name="details"
                  onChange={(e) =>
                    setUser({ ...user, DETAILS: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="username *"
                  name="user-name"
                  onChange={(e) =>
                    setUser({ ...user, USER_NAME: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="password *"
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, PASSWORD: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input type="submit" class="btnSubmit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <PageFooter color="#2b2526"/>
    </div>
  );
}
