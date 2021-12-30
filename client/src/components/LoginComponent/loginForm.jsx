import React, { useState, useContext } from "react"
import { Form, Input, Button} from "semantic-ui-react"
import AuthContext from "../../contexts/authContext";
import EthContext from "../../contexts/ethContext";
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const { setAccount, setCitizenContract } = useContext(EthContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleLogin = async () => {
        let res = await login(username, password);
        if (res.token) {
          setAccount(res.accountAddress) // there could be a check for if address exists on blockchain
          setCitizenContract(res.citizenContract)
          navigate("/dashboard")
        } else {
          alert("Username or password is invalid")
        }
      }

    return(
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
    )
}

export default LoginForm