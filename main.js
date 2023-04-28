// variaveis
let qtdCartas = 0;
let qtdViradas = 0;
let qtdJogadas = 0;
let qtdPontos = 0;
let baralho = [];
let cartasSelecionadas = [];

let tempoDecorrido = 0;
let intervalo = 0;

const gifs = [
  "gif/bobrossparrot.gif",
  "gif/explodyparrot.gif",
  "gif/fiestaparrot.gif",
  "gif/metalparrot.gif",
  "gif/revertitparrot.gif",
  "gif/tripletsparrot.gif",
  "gif/unicornparrot.gif",
];
// funções

definirNumeroCartas();

function definirNumeroCartas() {
  qtdCartas =
    prompt(
      "Com quantas cartas gostaria de jogar? É preciso escolher um numero par, entre 4 e 14!"
    ) * 1;
  if (qtdCartas > 3 && qtdCartas < 15 && qtdCartas % 2 === 0) {
    criarBaralho();
    intervalo = setInterval(aumentarTempo, 1000);
  } else {
    definirNumeroCartas();
  }
}

function criarBaralho() {
  for (c = 0; c < qtdCartas / 2; c++) {
    const carta = criarCarta(c);
    baralho.push(carta);
    baralho.push(carta);
  }
}

function criarCarta(indiceCarta) {
  const papagaios = gifs[indiceCarta];
  return `<div class="card" onclick="virarCartas(this)">
  <div class="front-face face">
    <img src="img/front.png" alt="" />
  </div>
  <div class="back-face face">
    <img class="gif" src="${papagaios}" alt="" />
  </div>
</div>`;
}

embaralharCartas();

function embaralharCartas() {
  return baralho.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}

distribuirCartas();
function distribuirCartas() {
  const container = document.querySelector(".tabuleiro");
  for (let i = 0; i < baralho.length; i++) {
    container.innerHTML += baralho[i];
  }
}

function virarCartas(carta) {
  carta.classList.add("selecionado");
  cartasSelecionadas.push(carta);
  if (cartasSelecionadas.length === 2) {
    qtdJogadas++;
    verificarImagens();
    verificarPlacar();
  }
}

function verificarImagens() {
  const primeiraCarta = cartasSelecionadas[0].innerHTML;
  const segundaCarta = cartasSelecionadas[1].innerHTML;
  if (primeiraCarta === segundaCarta) {
    qtdPontos++;
    cartasSelecionadas = [];
  } else {
    setTimeout(desvirarCartas, 1000);
  }
}

function desvirarCartas() {
  for (c = 0; c < cartasSelecionadas.length; c++) {
    cartasSelecionadas[c].classList.remove("selecionado");
  }
  cartasSelecionadas = [];
}

function verificarPlacar() {
  if (qtdCartas / 2 === qtdPontos) {
    setTimeout(endGame, 1000);
    clearInterval(intervalo);
  }
}

function endGame() {
  alert(
    `Parabéns você finalizou o jogo em ${qtdJogadas} jogadas e apenas ${tempoDecorrido} segundos!`
  );
  jogarNovamente();
}

function jogarNovamente() {
  const resposta = prompt("Deseja reiniciar? Se sim digite (ok)!");
  if (resposta === `ok`) {
    window.location.reload(true);
  } else {
    alert("ok, obrigado");
  }
}

function aumentarTempo() {
  tempoDecorrido++;
  document.querySelector(".tempo").innerHTML = tempoDecorrido;
}
