const express = require('express');
const bodyParser = require('body-parser');
const blockChain = new (require('./server/BlockChain'));
const http_port =  process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());


app.get('/block', (req, res) => res.json(blockChain.getBlockChain()));
app.post('/block', (req, res) => {
	let blockData = req.body.data;
	res.json(blockChain.generateNextBlock(blockData));
});

app.post('/mineBlock', (req, res) => {
	var newBlock = generateNextBlock(req.body);
	addBlock(newBlock);
	console.log('block added: ' + JSON.stringify(newBlock));
	res.json(newBlock);
});
app.listen(http_port, () => console.log('Listening http on port: ' + http_port));

