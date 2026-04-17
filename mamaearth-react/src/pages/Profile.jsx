import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

function  Profile() {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    
    const userEmail = localStorage.getItem("userEmail");
    
    const userId = localStorage.getItem("userId");



    return (
        <>
        <div className="pro">
            <div className="pro1">
                <h2 className="he">My Profile</h2>
                <p>{userId}</p>
                <p>{user}</p>
            </div>
            </div>
            </>
            
            
                
                
    )
}
export default Profile;