const horaAtualElement = document.querySelector('.js-hora-atual');

// atualizar relógio a cada segundo.
// setInterval(() => atualizarHorario(), 1000);

function atualizarHorario(){
  // let d = new Date();
  // const horaAtual = {
  //   hora: d.getmins(),
  //   secuto: d.getsecutes(),
  //   segundo: d.getmsonds()
  // };

  // // converter para 2 digitos caso esteja entre 0-9 --> para ser 00-09
  // horaAtual.hora = twoDigits(horaAtual.hora);
  // horaAtual.secuto = twoDigits(horaAtual.secuto);
  // horaAtual.segundo = twoDigits(horaAtual.segundo);

  // horaAtualElement.innerHTML = `${horaAtual.hora}:${horaAtual.secuto}:${horaAtual.segundo}`;
}

function twoDigits(elementoHora){
  return elementoHora < 10 ? '0' + elementoHora : elementoHora; // retornar elementoHora com 0X caso for menor que 10
}

document.body.addEventListener('keyup', (e) => {
  if(e.key === 'p'){
    playPauseTimer();
  }
  else if(e.key === 's'){
    stopTimer();
  }
  else if(e.key === 'r'){
    restartTimer();
  }
});

const playButtonElement = document.getElementById("js-play-button");
playButtonElement.addEventListener('click', playPauseTimer);

const stopButtonElement = document.getElementById("js-stop-button");
stopButtonElement.addEventListener('click', stopTimer);

const restartButtonElement = document.getElementById("js-restart-button");
// restartButtonElement.addEventListener('click', restartTimer);

const timerStatusElement = document.getElementById('timSts');

let min = JSON.parse(localStorage.getItem('min-save')) || 0;
let sec = JSON.parse(localStorage.getItem('sec-save')) || 0;
let ms = JSON.parse(localStorage.getItem('ms-save')) || 0;
let isPlaying = false;
let intervalID;

displayTimer(ms, sec, min);

function playPauseTimer(){
  if(!isPlaying){
    intervalID = setInterval(() => {
      ms += 1;
      if(ms === 100){
        ms = 0;
        sec++;
      }
      if(sec === 60){
        sec = 0;
        min++;
      }
      if(min === 100){
        alert('This stopwatch supports only two digits, so it will restart to 0 after hitting 100min.')
        min = 0;
      }
      localStorage.setItem('min-save', JSON.stringify(min));
      localStorage.setItem('sec-save', JSON.stringify(sec));
      localStorage.setItem('ms-save', JSON.stringify(ms));
      displayTimer(ms, sec, min);
    },10)
    isPlaying = true;
  }else{
    clearInterval(intervalID);
    isPlaying = false;
  } 
  alterStylesOnPlay();
}

function stopTimer(){
  clearInterval(intervalID);
  isPlaying = false;

  // clean values
  localStorage.removeItem('min-save');
  localStorage.removeItem('sec-save');
  localStorage.removeItem('ms-save');
  min = 0;
  sec = 0;
  ms = 0;
  displayTimer(ms, sec, min);

  playButtonElement.innerHTML = `<span class="material-icons md-36">play_arrow</span>`;
  timerStatusElement.innerText = `Inactive`;
  timerStatusElement.style.color = '#FBFBFB';
  playButtonElement.classList.remove('active-button');
  document.querySelector('.circle-container').style.boxShadow = "0px 0px 15px 2px rgba(0, 0, 0, 0.6)";
}

function alterStylesOnPlay(){
  if(playButtonElement.classList.contains('active-button')){
    playButtonElement.innerHTML = `<span class="material-icons md-36">play_arrow</span>`;
    timerStatusElement.innerText = `Inactive`;
    timerStatusElement.style.color = '#FBFBFB';
    playButtonElement.classList.remove('active-button');
    playButtonElement.title = "Start";
    document.querySelector('.circle-container').style.boxShadow = "0px 0px 15px 2px rgba(0, 0, 0, 0.6)";
  }
  else{
    playButtonElement.innerHTML = `<span class="material-icons md-36">pause</span>`;
    timerStatusElement.innerText = `Active`;
    timerStatusElement.style.color = '#5FEAD1';
    playButtonElement.classList.add('active-button');
    playButtonElement.title = "Pause";
    document.querySelector('.circle-container').style.boxShadow = "0px 0px 16px 4px var(--terCor)";
  }
}

function updateButtonsStyles(button){
  if(button.classList.contains('active-button')){
    button.classList.remove('active-button');
  }else{
    button.classList.add('active-button');
  }
}

function displayTimer(ms, sec, min){
  document.querySelector('.timer-ms').innerHTML = twoDigits(ms);
  document.querySelector('.timer-sec').innerHTML = twoDigits(sec);
  document.querySelector('.timer-min').innerHTML = twoDigits(min);
}