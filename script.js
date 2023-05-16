const horaAtualElement = document.querySelector('.hora-atual');

// atualizar relógio a cada segundo.
setInterval(() => atualizarHorario(), 1000);

function atualizarHorario(){
  let d = new Date();
  const horaAtual = {
    hora: d.getHours(),
    minuto: d.getMinutes(),
    segundo: d.getSeconds()
  };

  // converter para 2 digitos caso esteja entre 0-9 --> para ser 00-09
  horaAtual.hora = twoDigits(horaAtual.hora);
  horaAtual.minuto = twoDigits(horaAtual.minuto);
  horaAtual.segundo = twoDigits(horaAtual.segundo);

  horaAtualElement.innerHTML = `${horaAtual.hora}:${horaAtual.minuto}:${horaAtual.segundo}`;
}

function twoDigits(elementoHora){
  if(elementoHora < 10){
    return '0' + elementoHora;
  }
  return elementoHora;
}