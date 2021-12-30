import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import LoginForm from "./loginForm";
import "./loginComponent.css";
import SignupForm from "./signupForm";

const LoginComponent = () => {
  const [activeMenu, setActiveMenu] = useState("login");

  const handleClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <Menu className="ui two item menu">
        <Menu.Item
          name="login"
          active={activeMenu === "login"}
          onClick={() => handleClick("login")}
        ></Menu.Item>
        <Menu.Item
          name="Sign up"
          active={activeMenu === "signup"}
          onClick={() => handleClick("signup")}
        ></Menu.Item>
      </Menu>
      {activeMenu === "login" && (
        <LoginForm/>
      )}
      {activeMenu === "signup" && (
        <SignupForm/>
      )}
    </div>
  );
};

export default LoginComponent;
