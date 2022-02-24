import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/DatabaseAPI/",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
    "x-access-token": sessionStorage.token
  }
});