import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
    return(
        <div>
            Home
            <br />
            <Link to="/clicker">To clicker</Link>
        </div>
    )
}
  
export default HomePage;
