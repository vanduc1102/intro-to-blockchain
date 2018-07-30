# intro-to-blockchain
Simple sample for blockchain


# Simple mining

## checkout simple-mining branch
`git checkout simple-mining`

## Get start 
`npm run dev`

## Available API
Get all block:

`curl http://localhost:3000/api/blocks`

Create new Block:

`curl -H "Content-Type: application/json" -X POST -d '{"data":"new block."}' http://localhost:3000/api/blocks/mining`

# Proof-of-Work

## checkout Proof-of-Work branch
`git checkout proof-of-work`

## Get start 
`npm run dev`

## Available API
Get all block:

`curl http://localhost:3000/api/blocks`

Create new Block:

`curl -H "Content-Type: application/json" -X POST -d '{"data":"new block."}' http://localhost:3000/api/blocks/mining`
