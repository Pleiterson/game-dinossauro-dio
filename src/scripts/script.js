const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        // console.log('pressionou espaço');
        if (!isJumping) {
            jump();
        }
    }
}

// função que faz o dinossauro pular
function jump() {
    // let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
      if (position >= 150) {
        clearInterval(upInterval);
        
        // Descendo
        let downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          } else {
            position -= 20;
            dino.style.bottom = position + 'px';
          }
        }, 20);
      } else {
        // Subindo
        position += 20;
        dino.style.bottom = position + 'px';
      }
    }, 20);
  }

// função que cria e movimenta os cactos
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    // console.log(randomTime);
  
    if (isGameOver) return;
  
    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);
  
    let leftInterval = setInterval(() => {
      if (cactusPosition < -60) {
        // Saiu da tela
        clearInterval(leftInterval);
        background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        // Game over
        clearInterval(leftInterval);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);
  
    setTimeout(createCactus, randomTime);
}

// chamando função para criar e movimentar os cactos
createCactus();
document.addEventListener('keyup', handleKeyUp);
/*document.addEventListener('keyup', function() {
    console.log('pressionou uma tecla');
});*/