const express = require('express');
const bodyParser = require('body-parser');
const blockChain = new (require('./server/BlockChain'));
const http_port =  process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());


app.get('/api/blocks', (req, res) => res.json(blockChain.getBlockChain()));
app.post('/api/blocks/mining', (req, res) => {
	let blockData = req.body.data;
	res.json(blockChain.generateNextBlock(blockData));
});

app.listen(http_port, () => console.log('Listening http on port: ' + http_port));

