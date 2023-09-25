import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "./constants/constants";

function App() {
  return (
    <div>
      Welcome
      <Link to={PATH.SQUARE}>
        Klikni
      </Link>
    </div>
  );
}

export default App;
