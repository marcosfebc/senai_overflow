import React from "react";

import { Alert } from "./styles";

function Alerts(props) {
  const { mensagem, tipo, setMensagem } = props;

  return mensagem ?(
    <Alert tipo={tipo}>
      <h1>{mensagem}</h1>
      <spam
        onClick={() =>{
          setMensagem(undefined);
        }}
      >
        &times;
      </spam>
    </Alert>
  ) : null;
}

export default Alerts;  
