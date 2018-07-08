class Block {
  constructor(index, hash, previousHash, timestamp, data ) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
};

module.exports = Block;