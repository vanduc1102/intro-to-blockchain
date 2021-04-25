const express = require('express');
const morgan = require('morgan');
const blockChain = new (require('./src/BlockChain'));
const http_port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'))


app.get('/api/blocks', (req, res) => res.json(blockChain.getBlockChain()));
app.post('/api/blocks/mining', (req, res) => {
  let blockData = req.body.data;
  let { difficulty } = req.query;

  let start = Date.now();
  const block = blockChain.generateNextBlock(blockData, Number(difficulty));
  let end = Date.now();

  res.json({
    block,
    took: (end - start) / 1000 + 's'
  });
});

let server = app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
server.timeout = 5 * 60 * 1000;

module.exports = {
  server
}
