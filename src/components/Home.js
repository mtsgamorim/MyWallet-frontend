import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import logo from "../assents/MyWallet.png";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setUsuario } = useContext(UserContext);

  const navigate = useNavigate();

  function fazerLogin(event) {
    event.preventDefault();

    const promise = axios.post("https://my-wallet-amorim.herokuapp.com/login", {
      email: email,
      password: senha,
    });
    promise.then((res) => {
      setUsuario(res.data);
      navigate("/minhaCarteira");
    });

    promise.catch((err) => {
      alert("Falha ao logar, digite os dados corretamente");
    });
  }

  function redirecionar() {
    navigate("/cadastro");
  }
  return (
    <Container>
      <Content>
        <img src={logo} alt="MyWallet" />
        <form onSubmit={fazerLogin}>
          <input
            placeholder="E-Mail"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">
            <span>Entrar</span>
          </button>
        </form>
        <div onClick={redirecionar}>
          <p>Primeira vez? Cadastre-se!</p>
        </div>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  img {
    margin-bottom: 30px;
  }
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
  div {
    cursor: pointer;
    p {
      font-family: "Raleway";
      font-weight: 700;
      font-size: 15px;
      color: #ffffff;
      margin-top: 10px;
    }
  }
  button {
    width: 326px;
    height: 46px;
    border-radius: 5px;
    border: 0px;
    background-color: #a328d6;
    margin-bottom: 10px;
    span {
      font-family: "Raleway";
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
