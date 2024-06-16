const app = require('./app.js')
const db = require('./database/models')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
