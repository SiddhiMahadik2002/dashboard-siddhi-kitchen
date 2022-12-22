import React, { useEffect, useState, useContext } from "react";
import { AuthStack } from "./AuthStack/AuthStack";
import { AppStack } from "./AppStack/AppStack";
import { AuthContext } from "../Context/authContext";

export const Navigation = () => {
    const { isLogin, isLoading } = useContext(AuthContext);
    if (isLoading) {
      return (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Loading...</h1>
        </div>
      );
    }
    return isLogin ? <AppStack /> : <AuthStack />;
}
