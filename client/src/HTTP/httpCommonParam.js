import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/DatabaseAPI/",
  headers: {
    "Content-type": "application/json",
    "x-access-token": sessionStorage.token
  }
});