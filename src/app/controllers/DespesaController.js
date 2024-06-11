const DespesaRepository = require('../repositories/DespesaRepository')

class DespesaController {

        async adicionar(req, res) {
                const idU = req.params.idU
                const despesa = req.body
                
                await DespesaRepository.adicionar(idU, despesa)
                res.status(201).send('Despesa adicionada!')
        }

        async listar(req, res) {
                const idU = req.params.idU
                let resposta = await DespesaRepository.listar(idU)
                resposta = resposta.map(resposta => {
                        const dia = resposta.data.split('/')[0]
                        const mes = resposta.data.split('/')[1]
                        const ano = resposta.data.split('/')[2]
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
                res.status(204).end()
        }

        async deletar(req, res) {
                const idD = req.params.idD
                await DespesaRepository.deletar(idD)
                res.status(204).end()
        }

}

module.exports = new DespesaController()
