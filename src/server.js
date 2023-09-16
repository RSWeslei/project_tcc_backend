const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
routes(app);
app.get('/', (req, res) => {
    res.status(404).send('Pagina web nao encontrada!')
});

app.listen(3000, () => console.log('Server running on port 3000'));
