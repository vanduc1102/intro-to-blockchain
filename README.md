# intro-to-blockchain
Simple sample for blockchain

Get all block:

`
curl http://localhost:3000/block
`

Create new Block:

`
curl -H "Content-Type: application/json" -X POST -d '{"data":"dafadfasdfasdfasdfasdf"}' http://localhost:3000/block
`


