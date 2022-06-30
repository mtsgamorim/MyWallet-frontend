import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function MinhaCarteira() {
  const { usuario } = useContext(UserContext);
  console.log(usuario);
  return (
    <Container>
      <Topo>
        <h1>Olá, {usuario.name}</h1>
        <ion-icon name="exit-outline"></ion-icon>
      </Topo>
      <CaixaVazia></CaixaVazia>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Topo = styled.div`
  display: flex;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-family: "Raleway";
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
    margin-left: 26px;
  }
  ion-icon {
    color: #ffffff;
    font-size: 40px;
    margin-right: 26px;
  }
`;

const CaixaVazia = styled.div`
  width: 326px;
  height: 580px;
  border-radius: 5px;
  border: 0;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
`;
