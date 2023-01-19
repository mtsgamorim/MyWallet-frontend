import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function SubtrairDinheiro() {
  const { usuario } = useContext(UserContext);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const config = {
    headers: { Authorization: `Bearer ${usuario.token}` },
  };
  const navigate = useNavigate();
  function subtrairValor(event) {
    event.preventDefault();
    let valorNum = valor?.replace(",", ".");
    let valorNumConvertido = parseFloat(valorNum).toFixed(2);
    if (valorNumConvertido < 0) {
      alert("Apenas números positivos");
    } else if (descricao.length >= 24) {
      alert("descrição muito grande, maximo 23 caracteres");
    } else {
      const data = {
        valor: valorNumConvertido,
        descricao: descricao,
      };
      const promise = axios.post(
        "https://mywallet-back-807c.onrender.com/walletDelete",
        data,
        config
      );
      promise.then((res) => {
        navigate("/minhaCarteira");
      });
      promise.catch((err) => {
        alert("preencha os dados corretamente");
      });
    }
  }
  function voltar() {
    navigate("/minhaCarteira");
  }
  return (
    <Container>
      <Topo>
        <h1>Nova saída</h1>
        <BotaoSair onClick={voltar}>
          <ion-icon name="exit-outline"></ion-icon>
        </BotaoSair>
      </Topo>
      <form onSubmit={subtrairValor}>
        <input
          placeholder="Valor"
          type="text"
          value={valor}
          required
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          required
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">
          <span>Salvar Saída</span>
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  input {
    display: flex;
    flex-direction: column;
    width: 326px;
    height: 58px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 0px;
    ::placeholder {
      font-family: "Raleway";
      color: #000000;
      font-size: 20px;
      font-weight: 400;
    }
  }
  button {
    width: 326px;
    height: 46px;
    border-radius: 5px;
    border: 0px;
    background-color: #a328d6;
    margin-top: 10px;
    span {
      font-family: "Raleway";
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

const Topo = styled.div`
  display: flex;
  height: 90px;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-family: "Raleway";
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
  }
`;

const BotaoSair = styled.div`
  ion-icon {
    font-size: 34px;
    color: #ffffff;
  }
`;
