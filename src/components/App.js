import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import UserContext from "../contexts/UserContext";
import Home from "./Home";
import Cadastro from "./Cadastro";
import MinhaCarteira from "./MinhaCarteira";

export default function App() {
  const [usuario, setUsuario] = useState({});
  const contextValue = { usuario, setUsuario };
  return (
    <UserContext.Provider value={contextValue}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/minhaCarteira" element={<MinhaCarteira />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`;
