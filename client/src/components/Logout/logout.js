export default function logout(){

    sessionStorage.removeItem("token");
    window.location.replace("/");
}