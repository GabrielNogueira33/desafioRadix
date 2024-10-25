import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Dashboard from "./Dashboard";
import Sensores from "./Sensores";
// import React from "react";
import {gql, useQuery} from '@apollo/client';
import React from "react";


function App() {
  return (
    <div>
    <main>
      <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Cadastro" element={<Cadastro />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Sensores" element={<Sensores />}></Route>
      </Routes>
      </BrowserRouter>
    </main>
  </div>
  );

}

export default App;
