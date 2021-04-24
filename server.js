const express = require('express');
const blockChain = new (require('./server/BlockChain'));
const http_port =  process.env.PORT || 3000;
const app = express();
app.use(express.json())


app.get('/api/blocks', (req, res) => res.json(blockChain.getBlockChain()));
app.post('/api/blocks/mining', (req, res) => {
	let blockData = req.body.data;
	res.json(blockChain.generateNextBlock(blockData));
});

let server = app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
server.timeout = 5 * 60 * 1000;

module.exports = {
  server
}
