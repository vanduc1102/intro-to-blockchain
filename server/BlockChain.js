const Block = require('./Block');
const crypto = require('crypto');
const secret = 'this is my secret';

class BlockChain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(
      0,
      '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
      '',
      Date.now(),
      'my genesis block!!'
    );
  }

  generateNextBlock(blockData) {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = Date.now();
    const nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
    this.addBlock(newBlock);
    return newBlock;
  }

  addBlock(newBlock) {
    if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
      this.blockchain.push(newBlock);
    }
  };

  calculateHash(index, previousHash, timestamp, data) {
    const hashData = index + previousHash + timestamp + data;
    return crypto
      .createHmac('sha256', secret)
      .update(hashData)
      .digest('hex');
  }


  getBlockChain() {
    return this.blockchain;
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }


  isValidBlockStructure(block) {
    return typeof block.index === 'number'
      && typeof block.hash === 'string'
      && typeof block.previousHash === 'string'
      && typeof block.timestamp === 'number'
      && typeof block.data === 'string';
  };

  calculateHashForBlock(block) {
    return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
  }

  isValidNewBlock(newBlock, previousBlock) {
    if (!this.isValidBlockStructure(newBlock)) {
      console.log('invalid structure');
      return false;
    }
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('invalid index');
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('invalid previousHash');
      return false;
    } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log(typeof (newBlock.hash) + ' ' + typeof this.calculateHashForBlock(newBlock));
      console.log('invalid hash: ' + this.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
      return false;
    }
    return true;
  };

}

module.exports = BlockChain;
