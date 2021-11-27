import React, { useState } from "react";
import { Input, Button, Menu, Form } from "semantic-ui-react";
import "./loginComponent.css";

const LoginComponent = () => {
  const [activeMenu, setActiveMenu] = useState("citizen");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (menu) => {
    console.log(menu);
    setActiveMenu(menu);
  };

  const handleLogin = () => {
    // auth
    if (username === "admin") {
      console.log("YES");
    }
  };

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
