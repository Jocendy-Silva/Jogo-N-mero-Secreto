let listaNumerosGerados = [];
let numeroLimite = 100; console.log('numeroLimite = ' + numeroLimite);
let numeroSecreto = gerarNumero(); console.log('numeroSecreto = ' + numeroSecreto);
let tentativas = 1;

function exibirMenssagem() {
  
  exibirTextoNaTela('h1', 'Jogo do Número Secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);  
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}
exibirMenssagem()

function exibirTextoNaTela(tag, texto) {

  let campo = document.querySelector(tag);
  campo.innerHTML = texto;

}

function verificarChute() {

  let chute = document.querySelector('input').value;
  console.log('chute == numeroSecreto = ', chute == numeroSecreto);
  let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
  let messagemTentativas = `Você descobriu o Número Secreto com ${tentativas} ${palavraTentativa}!`;


  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    exibirTextoNaTela('p', messagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O Número Secreto é menor.');
    } else {
      exibirTextoNaTela('p', 'O Número Secreto é maior.');
    }

    tentativas++; console.log('tentativas= ' + tentativas);
    limparCampo();
  }

}

function gerarNumero() {

  let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
  let comprimentoLista = listaNumerosGerados.length;

  if (comprimentoLista == numeroLimite) {
    listaNumerosGerados = [];
  }

  if (listaNumerosGerados.includes(numeroGerado)) {
    return gerarNumero();
  } else {
    listaNumerosGerados.push(numeroGerado);
    console.log(listaNumerosGerados);
    return numeroGerado;
  }

}

function limparCampo() {

  chute = document.querySelector('input');
  chute.value = '';

}

function reiniciarJogo() {

  numeroSecreto = gerarNumero();
  limparCampo();
  tentativas = 1;
  exibirMenssagem();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  
}