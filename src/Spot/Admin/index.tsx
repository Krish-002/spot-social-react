import { Routes, Route, useNavigate } from "react-router-dom";


function AdminHomePage(){
    const navigate = useNavigate();

    return (<div >
    <h1>Admin Home Page</h1>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    </div>)
}

export default AdminHomePage;