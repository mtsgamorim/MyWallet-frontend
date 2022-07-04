import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function MinhaCarteira() {
  function Transacao({ day, soma, valor, descricao }) {
    const novoValor = valor?.replace(".", ",");
    return (
      <Lista>
        <span>{day}</span>
        <div>
          <h4>{descricao}</h4>
        </div>
        <h5>{novoValor}</h5>
      </Lista>
    );
  }

  const [wallet, setWallet] = useState([]);
  const { usuario } = useContext(UserContext);
  console.log(wallet);
  console.log(usuario);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${usuario.token}` },
    };
    const promise = axios.get("http://localhost:5000/wallet", config);
    promise.then((res) => {
      setWallet([...res.data]);
    });
  }, []);
  const navigate = useNavigate();
  function voltar() {
    navigate("/");
  }
  function paginaAdicionar() {
    navigate("/somarDinheiro");
  }
  function paginaRemover() {
    navigate("/subtrairDinheiro");
  }
  function Vazio() {
    return (
      <CaixaVazia>
        <div>
          <span>Não há registros de</span>
          <br />
          <span>entrada ou saida</span>
        </div>
      </CaixaVazia>
    );
  }

  function NaoVazio() {
    return (
      <Caixa>
        <ConteudoCaixa>
          {wallet.map((item) => (
            <Transacao
              day={item.day}
              soma={item.soma}
              valor={item.valor}
              descricao={item.descricao}
            />
          ))}
        </ConteudoCaixa>
        <Footer>
          <h3>SALDO</h3>
          <h4>20</h4>
        </Footer>
      </Caixa>
    );
  }
  return (
    <Container>
      <Topo>
        <h1>Olá, {usuario.name}</h1>
        <BotaoSair onClick={voltar}>
          <ion-icon name="exit-outline"></ion-icon>
        </BotaoSair>
      </Topo>
      {wallet.length > 0 ? <NaoVazio /> : <Vazio />}
      <AreaBotoes>
        <BotaoDinheiro onClick={paginaAdicionar}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <h2>Nova</h2>
          <h2>entrada</h2>
        </BotaoDinheiro>
        <BotaoDinheiro onClick={paginaRemover}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <h2>Nova</h2>
          <h2>saída</h2>
        </BotaoDinheiro>
      </AreaBotoes>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 326px;
  height: 60%;
  border-radius: 5px;
  border: 0;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  div {
    width: 200px;
    margin-left: 10px;
  }
  span {
    font-family: "Raleway";
    font-weight: 400;
    font-size: 20px;
    color: #868686;
    :last-child {
      margin-left: 12px;
    }
  }
`;

const BotaoSair = styled.div`
  cursor: pointer;
`;

const AreaBotoes = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const BotaoDinheiro = styled.div`
  width: 155px;
  height: 114px;
  background-color: #a328d6;
  border-radius: 5px;
  border: 0;
  margin-left: 10px;
  ion-icon {
    color: #ffffff;
    font-size: 30px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 26px;
  }
  h2 {
    font-family: "Raleway";
    font-weight: 700;
    font-size: 17px;
    color: #ffffff;
    margin-left: 10px;
  }
`;

const Caixa = styled.div`
  width: 326px;
  height: 60%;
  border-radius: 5px;
  border: 0;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
`;

const ConteudoCaixa = styled.div`
  height: 470px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    font-family: "Raleway";
    font-weight: 700;
    font-size: 17px;
    margin-left: 10px;
  }
  h4 {
    font-family: "Raleway";
    font-weight: 400;
    font-size: 17px;
    color: #03ac00;
    margin-right: 10px;
  }
`;

const Lista = styled.div`
  display: flex;
  margin-top: 10px;
  div {
    width: 220px;
  }
  span {
    color: #c6c6c6;
    font-family: "Raleway";
    font-weight: 400;
    font-size: 16px;
    margin-right: 10px;
  }
  h4 {
    font-family: "Raleway";
    font-weight: 400;
    font-size: 16px;
  }
  h5 {
    font-family: "Raleway";
    font-weight: 400;
    font-size: 16px;
  }
`;
