const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api.js');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello There!');
})

app.use('/api', api);

app.listen(3000, () => {
    console.log('Hello');
});