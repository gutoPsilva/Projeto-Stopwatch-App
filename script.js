const horaAtualElement = document.querySelector('.js-hora-atual');
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
  return elementoHora < 10 ? '0' + elementoHora : elementoHora; // retornar elementoHora com 0X caso for menor que 10
}

const playButtonElement = document.getElementById("js-play-button");
const timerStatusElement = document.getElementById('timSts');

document.body.addEventListener('keyup', (event) => {
  if(event.key === 'p'){
    playPause();
  }
});

playButtonElement.addEventListener('click', playPause);

function playPause(){
  if(playButtonElement.innerText === 'play_arrow'){
    playButtonElement.innerHTML = `<span class="material-icons md-36">pause</span>`;
    timerStatusElement.innerText = `Active`;
    timerStatusElement.style.color = '#5FEAD1';
    document.getElementById('play-icon').style.color = "#000000";
    playButtonElement.classList.add('active-button');
  }
  else{
    playButtonElement.innerHTML = `<span class="material-icons md-36">play_arrow</span>`;
    timerStatusElement.innerText = `Inactive`;
    timerStatusElement.style.color = '#FBFBFB';
    document.getElementById('play-icon').style.color = "red"
    playButtonElement.classList.remove('active-button');
    
  }
}