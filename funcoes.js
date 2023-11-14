// Importa o array de dados IPCA do módulo 'dados'
const { ipcaData } = require('./dados');

// Função para retornar um objeto IPCA com base no ID fornecido
function retornaId(id) {
    // Utiliza o método find para encontrar o objeto com o ID correspondente
    const retornaIdInput = ipcaData.find(a => a.id === id);
    return retornaIdInput;
}

// Função para retornar um array de objetos IPCA com base no ano fornecido
function retornaPorAno(ano) {
    // Utiliza o método filter para encontrar os objetos com o ano correspondente
    const retornaAno = ipcaData.filter(a => a.ano === ano);
    return retornaAno;
}

// Função para calcular e retornar o valor ajustado com base nos parâmetros fornecidos
function retornaValorAjustado(valor, mesInicial, anoInicial, mesFinal, anoFinal) {
    let nvIpca;

    // Verifica se o ano inicial é igual ao ano final
    if (anoInicial === anoFinal) {
        // Filtra os objetos IPCA com base no intervalo de meses e ano
        nvIpca = ipcaData.filter(a => a.ano === anoInicial && a.mes >= mesInicial && a.mes <= mesFinal).map(a => a.ipca);
    } else {
        // Filtra os objetos IPCA considerando diferentes cenários de intervalo de meses e anos
        nvIpca = ipcaData.filter(a => (a.ano === anoFinal && a.mes === mesInicial) || (a.ano >= anoInicial && a.ano <= anoFinal) || (a.ano === anoFinal && a.mes === mesFinal)).map(a => a.ipca);
    }

    // Calcula a soma ajustada do IPCA e multiplica pelo valor fornecido
    let ipcaSoma = nvIpca.reduce((s, n) => s * (1 + n / 100), 1);
    let resultado = valor * ipcaSoma;

    // Retorna o resultado formatado como uma string
    return `R$${resultado.toFixed(2)}`;
}





exports.retornaPorAno = retornaPorAno;
exports.retornaId = retornaId; 
exports.retornaValorAjustado = retornaValorAjustado;