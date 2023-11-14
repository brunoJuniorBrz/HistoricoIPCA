// Importa o módulo Express e cria uma instância do aplicativo
const express = require('express');
const app = express();

// Importa dados do módulo 'dados' e funções do módulo 'funcoes'
const { ipcaData } = require('./dados');
const { retornaId, retornaPorAno, retornaValorAjustado } = require('./funcoes');

// Rota para calcular o IPCA ajustado com base nos parâmetros fornecidos
app.get('/ipca/calculo', (req, res) => {
    // Extrai parâmetros da query da requisição
    const valor = parseInt(req.query.valor);
    const mesInicial = parseInt(req.query.mesInicial);
    const anoInicial = parseInt(req.query.anoInicial);
    const mesFinal = parseInt(req.query.mesFinal);
    const anoFinal = parseInt(req.query.anoFinal);

    // Verifica se os parâmetros necessários estão presentes
    if (valor && mesInicial && anoInicial && mesFinal && anoFinal) {
        // Chama a função para calcular o IPCA ajustado
        const retornaResultado = retornaValorAjustado(valor, mesInicial, anoInicial, mesFinal, anoFinal);

        // Valida se os anos, meses e valor estão dentro dos limites aceitáveis
        if (anoInicial >= 2015 && anoFinal <= 2023 && mesInicial >= 1 && mesFinal <= 12 && typeof (valor) === 'number') {
            // Se tudo estiver correto, retorna o resultado
            res.json({ 'resultado': retornaResultado });
        } else {
            // Se os parâmetros estiverem fora dos limites, retorna uma mensagem de erro
            res.json({ 'Erro': 'O ano vai de 2015 a 2023. O mês vai de 1 a 12. Verifique se o valor digitado corresponde a um número!' });
        }
    } else {
        // Se algum parâmetro estiver faltando, retorna um status de erro
        res.status(404).send('Verifique os valores e tente novamente!');
    }
});

// Rota para obter dados do IPCA com base no ID fornecido
app.get('/ipca/:idIPCA', (req, res) => {
    // Extrai o parâmetro da URL
    let idIPCA = parseInt(req.params.idIPCA);

    // Valida se o ID está dentro dos limites aceitáveis
    if (idIPCA >= 1 && idIPCA <= 101) {
        // Chama a função para obter dados do IPCA por ID
        let retornaIdIPCA = retornaId(idIPCA);
        // Retorna os dados do IPCA correspondentes ao ID
        res.json(retornaIdIPCA);
    } else {
        // Se o ID estiver fora dos limites, retorna uma mensagem de erro
        res.status(404).send('Insira um ID de 1 a 101!');
    }
});

// Rota para obter dados do IPCA com base no ano fornecido
app.get('/ipca', (req, res) => {
    // Extrai o parâmetro da query da requisição
    const ano = parseInt(req.query.ano);

    // Verifica se o ano foi fornecido
    if (ano) {
        // Chama a função para obter dados do IPCA por ano
        const retornaAno = retornaPorAno(ano);

        // Valida se o ano está dentro dos limites aceitáveis
        if (ano >= 2015 && ano <= 2023) {
            // Se tudo estiver correto, retorna os dados do IPCA correspondentes ao ano
            res.json(retornaAno);
        } else {
            // Se o ano estiver fora dos limites, retorna uma mensagem de erro
            res.status(404).send('Insira um ano entre 2015 e 2023!');
        }
    } else {
        // Se nenhum ano foi fornecido, retorna todos os dados do IPCA
        res.json(ipcaData);
    }
});

// Inicia o servidor na porta 5000 e exibe uma mensagem no console
app.listen(5000, () => {
    let data = new Date();
    console.log('Servidor iniciado em: ' + data);
});
