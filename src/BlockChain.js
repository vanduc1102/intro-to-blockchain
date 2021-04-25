const Block = require('./Block');
const crypto = require('crypto');
const secret = 'this is my secret';

class BlockChain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(
      0,
      '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7',
      '',
      Date.now(),
      '2021-04-24 "MacKenzie Scott Gave Away Billions. The Scam Artists Followed. - The New York Times".'
    );
  }

  generateNextBlock(blockData, difficulty = 0) {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = Date.now();
    console.log("Current difficulty: " + difficulty);
    const newBlock = this.findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
    this.addBlock(newBlock);
    return newBlock;
  }

  findBlock(index, previousHash, timestamp, data, difficulty) {
    let nonce = 0;
    while (true) {
      const hash = this.calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
      if (this.checkHashMatchesDifficulty(hash, difficulty)) {
        return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
      }
      nonce++;
    }
  }

  addBlock(newBlock) {
    if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
      this.blockchain.push(newBlock);
    }
  }

  calculateHash(index, previousHash, timestamp, data, difficulty, nonce) {
    const hashData = index + previousHash + timestamp + data + difficulty + nonce;
    return crypto
      .createHmac('sha256', secret)
      .update(hashData)
      .digest('hex');
  }

  checkHashMatchesDifficulty(hash, difficulty) {
    const hashInBinary = this.hexToBinary(hash);
    const requiredPrefix = difficulty ? '0'.repeat(difficulty) : "0";
    return hashInBinary.startsWith(requiredPrefix);
  }

  hexToBinary(hashHex) {
    let hashBinary = '';
    const lookupTable = {
      '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
      '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
      'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
      'e': '1110', 'f': '1111'
    };
    for (let i = 0; i < hashHex.length; i = i + 1) {
      if (lookupTable[hashHex[i]]) {
        hashBinary += lookupTable[hashHex[i]];
      } else {
        return null;
      }
    }
    return hashBinary;
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
  }

  calculateHashForBlock(block) {
    return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data,
      block.difficulty, block.nonce);
  }

  getDifficulty() {
    let min = 15,
      max = 22;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  isValidNewBlock(newBlock, previousBlock) {
    if (!this.isValidBlockStructure(newBlock)) {
      return false;
    }
    if (previousBlock.index + 1 !== newBlock.index) {
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      return false;
    } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
      return false;
    }
    return true;
  }

}

module.exports = BlockChain;
