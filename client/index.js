const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const tree = new MerkleTree(niceList);
  const name = niceList[0];

  const index = niceList.indexOf(name);

  if (index === -1) {
    console.log('Name not in the list');
    return;
  }

  const proof = tree.getProof(niceList.indexOf(name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: JSON.stringify(name),
    proof,
  });

  console.log({ gift });
}

main();
