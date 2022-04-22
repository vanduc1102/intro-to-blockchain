# intro-to-blockchain
Simple sample for blockchain

## Get start
- Install NodeJs with [NVM](https://github.com/nvm-sh/nvm)

```
nvm use
```

- Install dependencies

```
yarn install
```

- Start

```
yarn start
```

## Available API

### Using CURL
Get all block:

```
curl http://localhost:3000/api/blocks
```

Create new Block:

```
curl -H "Content-Type: application/json" -X POST -d '{"data":"new block."}' http://localhost:3000/api/blocks/mining

```

### [VS Code HttpClient](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

`docs/api.http`
