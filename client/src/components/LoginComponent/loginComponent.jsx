import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Menu } from "semantic-ui-react";
import LoginForm from "./loginForm";
import "./loginComponent.css";
import SignupForm from "./signupForm";

const LoginComponent = () => {
  const [activeMenu, setActiveMenu] = useState();
  const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setActiveMenu(location.state)
        } else {
            setActiveMenu("login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  const handleClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="ui middle aligned center aligned grid">
      <div id="loginColumn" className="column">
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
      <br/>
      {activeMenu === "login" && (
        <LoginForm/>
      )}
      {activeMenu === "signup" && (
        <SignupForm/>
      )}
      </div>
    </div>
  );
};

export default LoginComponent;
