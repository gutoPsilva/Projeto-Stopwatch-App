const horaAtualElement = document.querySelector('.js-hora-atual');

// atualizar relógio a cada segundo.
// setInterval(() => atualizarHorario(), 1000);

function atualizarHorario(){
  // let d = new Date();
  // const horaAtual = {
  //   hora: d.getHours(),
  //   minuto: d.getMinutes(),
  //   segundo: d.getSeconds()
  // };

  // // converter para 2 digitos caso esteja entre 0-9 --> para ser 00-09
  // horaAtual.hora = twoDigits(horaAtual.hora);
  // horaAtual.minuto = twoDigits(horaAtual.minuto);
  // horaAtual.segundo = twoDigits(horaAtual.segundo);

  // horaAtualElement.innerHTML = `${horaAtual.hora}:${horaAtual.minuto}:${horaAtual.segundo}`;
}

function twoDigits(elementoHora){
  return elementoHora < 10 ? '0' + elementoHora : elementoHora; // retornar elementoHora com 0X caso for menor que 10
}

document.body.addEventListener('keyup', (e) => {
  if(e.key === 'p'){
    playPause();
  }
});

const playButtonElement = document.getElementById("js-play-button");
const timerStatusElement = document.getElementById('timSts');
playButtonElement.addEventListener('click', playPause);

let hour = localStorage.getItem('hour-save') || 0;
let min = localStorage.getItem('min-save') || 0;
let sec = localStorage.getItem('sec-save') || 0;
let isPlaying = false;
let intervalID;

const timerHourElement = document.querySelector('.timer-hours');
const timerMinElement = document.querySelector('.timer-min');
const timerSecElement = document.querySelector('.timer-sec');

displayTimer(sec, min, hour);

function playPause(){

  if(!isPlaying){
    intervalID = setInterval(() => {
      sec++;

      if(sec === 60){
        sec = 0;
        min++;
      }

      if(min === 60){
        min = 0;
        hour++;
      }

      if(hour === 99){
        alert('This stopwatch supports only two digits, so it will restart to 0 after 99.')
        hour = 0;
      }

      localStorage.setItem('hour-save', hour);
      localStorage.setItem('min-save', min);
      localStorage.setItem('sec-save', sec);
      displayTimer(sec, min, hour);
    },1000)
    isPlaying = true;
  }else{
    clearInterval(intervalID);
    isPlaying = false;
  }
  alterStylesOnPlay();
}

function alterStylesOnPlay(){
  if(playButtonElement.classList.contains('active-button')){
    playButtonElement.innerHTML = `<span class="material-icons md-36">play_arrow</span>`;
    timerStatusElement.innerText = `Inactive`;
    timerStatusElement.style.color = '#FBFBFB';
    playButtonElement.classList.remove('active-button');
  }
  else{
    playButtonElement.innerHTML = `<span class="material-icons md-36">pause</span>`;
    timerStatusElement.innerText = `Active`;
    timerStatusElement.style.color = '#5FEAD1';
    playButtonElement.classList.add('active-button');
  }
}

function displayTimer(sec, min, hour){
  timerSecElement.innerHTML = twoDigits(sec);
  timerMinElement.innerHTML = twoDigits(min);
  timerHourElement.innerHTML = twoDigits(hour);
}