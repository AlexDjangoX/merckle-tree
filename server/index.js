const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

const tree = new MerkleTree(niceList);
let MERKLE_ROOT = tree.getRoot();

MERKLE_ROOT =
  'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

console.log('Leaves : ', niceList.length);
console.log('Layers : ', Math.ceil(Math.log2(niceList.length)));

app.post('/gift', (req, res) => {
  const { name, proof } = req.body;

  const isInTheList = verifyProof(proof, JSON.parse(name), MERKLE_ROOT);

  if (isInTheList) {
    res.send('You got a toy robot!');
  } else {
    res.send('You are not on the list :(');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
