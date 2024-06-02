const DespesaRepository = require('./repositories/DespesaRepository')

class DespesaController {

    async adicionar(req, res) {
        const idU = req.params.idU
        const despesa = req.body
        await DespesaRepository.adicionar(idU, despesa)
        res.status(200).send('Despesa adicionada!')
    }

    async listar(req, res) {
        const idU = req.params.idU
        let resposta = await DespesaRepository.listar(idU)
        resposta = resposta.map(resposta => {
            const data = new Date(resposta.createdAt);
            const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia com zero à esquerda
            const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês com zero à esquerda
            const ano = data.getFullYear().toString(); // Obtém o ano
            return {
                idDespesa: resposta.idDespesa,
                valor: resposta.valor,
                descricao: resposta.descricao,
                origem: resposta.origem,
                dia: dia,
                mes: mes,
                ano: ano,
                pago: resposta.pago
            };
        })

        res.status(200).json(resposta)
    }

    async atualizar(req, res) {
        const idD = req.params.idD
        const despesa = req.body
        await DespesaRepository.atualizar(idD, despesa)
        res.status(200).send('Despesa atualizada!')
    }

    async deletar(req, res) {
        const idD = req.params.idD
        await DespesaRepository.deletar(idD)
        res.status(200).send('Despesa "deletada"!')
    }

}

module.exports = new DespesaController()
