# IPCA Calculator

Este projeto é uma API simples que calcula o Índice Nacional de Preços ao Consumidor Amplo (IPCA) ajustado com base nos dados históricos fornecidos.

## Dados do IPCA

Os dados do IPCA estão armazenados no arquivo `dados.js` e são representados como um array de objetos, onde cada objeto contém informações sobre o IPCA para um mês específico.

```javascript

const ipcaData = [
  { id: 1, ano: 2015, mes: 1, ipca: 1.24 },
  { id: 2, ano: 2015, mes: 2, ipca: 1.22 },
  // ... (dados do IPCA) ...
];

exports.ipcaData = ipcaData;

Funções

O arquivo funcoes.js contém três funções principais para manipular os dados do IPCA:

retornaId(id): Retorna um objeto IPCA com base no ID fornecido.
retornaPorAno(ano): Retorna um array de objetos IPCA com base no ano fornecido.
retornaValorAjustado(valor, mesInicial, anoInicial, mesFinal, anoFinal): Calcula e retorna o valor ajustado com base nos parâmetros fornecidos.

const { ipcaData } = require('./dados');

function retornaId(id) {
  // ... (implementação da função)
}

function retornaPorAno(ano) {
  // ... (implementação da função)
}

function retornaValorAjustado(valor, mesInicial, anoInicial, mesFinal, anoFinal) {
  // ... (implementação da função)
}

exports.retornaPorAno = retornaPorAno;
exports.retornaId = retornaId; 
exports.retornaValorAjustado = retornaValorAjustado;


Endpoints da API
A API expõe os seguintes endpoints:

/ipca/calculo: Calcula o IPCA ajustado com base nos parâmetros fornecidos.

Parâmetros:
valor: Valor a ser ajustado.
mesInicial, anoInicial: Mês e ano inicial do intervalo.
mesFinal, anoFinal: Mês e ano final do intervalo.
/ipca/:idIPCA: Retorna dados do IPCA com base no ID fornecido.

Parâmetros:
idIPCA: ID do IPCA desejado.
/ipca: Retorna dados do IPCA com base no ano fornecido, ou todos os dados se nenhum ano for fornecido.

Parâmetros:
ano: Ano desejado.

Instruções de Instalação e Uso

Clone o repositório:

git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

Instale as dependências:
npm install

node nome-do-arquivo-do-servidor.js

Acesse a API em http://localhost:5000

Exemplos de Uso
Calcular IPCA Ajustado:

GET /ipca/calculo?valor=1000&mesInicial=1&anoInicial=2015&mesFinal=12&anoFinal=2023

Obter Dados do IPCA por ID:
GET /ipca/5

Obter Dados do IPCA por Ano:

GET /ipca?ano=2022

Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.