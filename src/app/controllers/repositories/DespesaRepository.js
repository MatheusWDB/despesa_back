const db = require('../../db/models')

class DespesaRepository {

    async adicionar(idU, despesa) {
        try {
            console.log(despesa)
            await db.despesas.create({
                idUsuario: idU,
                ...despesa
            })

        } catch (error) {
            console.log(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

    async listar(idU) {
        try {
            const lista = await db.despesas.findAll({
                attributes: ['idDespesa', 'valor', 'descricao', 'origem', 'pago', 'createdAt'],
                where: {
                    idUsuario: idU,
                    deletado: 'F'
                }
            })
            return lista

        } catch (error) {
            console.log(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

    async atualizar(idD, despesa) {
        try {
            await db.despesas.update(despesa, {
                where: { idDespesa: idD }
            })

        } catch (error) {
            console.log(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

    async deletar(idD) {
        try {
            await db.despesas.update({ deletado: 'V' }, {
                where: { idDespesa: idD }
            })

        } catch (error) {
            console.log(error)
            throw new Error('Erro ao verificar os dados');
        }
    }
    
}

module.exports = new DespesaRepository()
