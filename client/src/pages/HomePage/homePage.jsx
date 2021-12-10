import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
const HomePage = () => {
  const test = async () => {
    let res = await fetch("http://localhost:3001/", {
      method: "GET",
      headers: {
          authorization: `${localStorage.getItem("token")}`
      },
    })
    console.log(await res.text());
    
  };

  return (
    <div>
      Home
      <br />
      <Link to="/clicker">To clicker</Link>
      <Button onClick={() => test()}>Test backend</Button>
    </div>
  );
};

export default HomePage;
