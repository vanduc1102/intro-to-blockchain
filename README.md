# intro-to-blockchain
Simple sample for blockchain

Get all block:

`
curl http://localhost:3000/blocks
`

Create new Block:

`
curl -H "Content-Type: application/json" -X POST -d '{"data":"new block."}' http://localhost:3000/mine-block
`
