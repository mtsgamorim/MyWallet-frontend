import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assents/MyWallet.png";

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const navigate = useNavigate();

  function fazerCadastro(event) {
    event.preventDefault();
    if (senha === confirmaSenha) {
      const promise = axios.post(
        "https://my-wallet-amorim.herokuapp.com/cadastro",
        {
          name: nome,
          email: email,
          password: senha,
        }
      );
      promise.then((res) => {
        navigate("/");
      });
      promise.catch((err) => {
        alert("Problema na criação");
      });
    } else {
      alert("Senhas não iguais, crie novamente");
    }
  }

  function redirecionar() {
    navigate("/");
  }
  return (
    <Container>
      <Content>
        <img src={logo} alt="MyWallet" />
        <form onSubmit={fazerCadastro}>
          <input
            placeholder="Nome"
            type="text"
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
          />
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
          <input
            placeholder="Confirme a senha"
            type="password"
            value={confirmaSenha}
            required
            onChange={(e) => setConfirmaSenha(e.target.value)}
          />
          <button type="submit">
            <span>Cadastrar</span>
          </button>
        </form>
        <div onClick={redirecionar}>
          <p>Já tem uma conta? Entre agora!</p>
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
