import React from "react";
import { Routes,Route } from "react-router-dom";
import { Adminlogin } from "../../pages/AdminLogin/adminlogin";
export const AuthStack = () => {
    return (
        <div>
               <Routes>
                <Route path="/" element={<Adminlogin/>}/> 
              
            </Routes>
        </div>
        
    )
}