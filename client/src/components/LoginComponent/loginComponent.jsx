import React, { useState, useContext } from "react";
import { Input, Button, Menu, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom"
import "./loginComponent.css";
import AuthContext from "../../contexts/authContext";

const LoginComponent = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("citizen");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogin = async () => {
    let res = await login(username, password);
    if (res) {
      navigate("/dashboard")
    } else {
      alert("Username or password is invalid")
    }
  }

  return (
    <div>
      <Menu className="ui two item menu">
        <Menu.Item
          name="citizen"
          active={activeMenu === "citizen"}
          onClick={() => handleClick("citizen")}
        ></Menu.Item>
        <Menu.Item
          name="company"
          active={activeMenu === "company"}
          onClick={() => handleClick("company")}
        ></Menu.Item>
      </Menu>
      {activeMenu === "citizen" && (
        <div>
          <h1>Login</h1>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
            <Button type="submit" primary onClick={() => handleLogin()}>
              Login
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
