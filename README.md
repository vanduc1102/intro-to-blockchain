# intro-to-blockchain
Simple sample for blockchain

## Get start

- Install dependencies
`yarn install`

- Start
`yarn start`

## Available API
get all block:

`curl http://localhost:3000/api/blocks`

Create new Block:

`curl -H "Content-Type: application/json" -X POST -d '{"data":"new block."}' http://localhost:3000/api/blocks/mining`
