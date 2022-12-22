import React from "react"; 
import "./header.css"
import {Link,useNavigate} from "react-router-dom"
export const Header=()=>{
    const navigate=useNavigate()
    return(
        <div className="header">
          <div id="left">
              <h1 onClick={()=>{navigate("/")}} style={{cursor:"pointer"}}>Dashboard</h1>

          </div>
          <div id="right">
               <Link to={"/recipes"}>All recipes</Link>
              <Link to={"/create/recipes"}>Create recipes</Link>
              <Link to={"/categories"}>Category</Link>
              
          </div>
        </div>
    )
}