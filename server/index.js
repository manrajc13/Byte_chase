const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Authrouter = require('./routes/Authrouter');
const PdfRouter = require('./routes/pdfRouter');
require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', Authrouter);
app.use('/pdf', PdfRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});



