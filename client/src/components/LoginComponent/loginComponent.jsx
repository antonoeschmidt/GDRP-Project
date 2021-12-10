import React, { useState } from "react";
import { Input, Button, Menu, Form } from "semantic-ui-react";
import { createHeader } from "../../utils/AuthService";
import "./loginComponent.css";

const LoginComponent = () => {
  const [activeMenu, setActiveMenu] = useState("citizen");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleClick = (menu) => {
    console.log(menu);
    setActiveMenu(menu);
  };

  const handleLogin = () => {
    // auth
    if (!username || !password) {
      // do nothing
    } else {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          setToken(res.token);
          console.log(token);

          // var header = createHeader(res.token)
          // console.log(header)
        });
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
