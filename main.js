// main.js
// Driver script for testing the BST implementation (bst.js)

import { Tree, prettyPrint } from './bst.js';

// Helper: generate array of random integers (length n) < 100, no guarantee on uniqueness
const randomArray = (n = 15, maxExclusive = 100) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * maxExclusive));
  }
  return arr;
};

// Create random data and build tree
const data = randomArray(15, 100);
console.log('Initial random array (may contain duplicates):', data);

const tree = new Tree(data);

// Print tree structure
console.log('\nPretty print of balanced tree built from sorted unique input:');
prettyPrint(tree.root);

// Is balanced?
console.log('\nIs balanced?', tree.isBalanced());

// Print traversals
console.log('\nLevel-order traversal:');
tree.levelOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n\nIn-order traversal (sorted ascending):');
tree.inOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n\nPre-order traversal:');
tree.preOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n\nPost-order traversal:');
tree.postOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n');

// Show heights/depths for a couple of nodes (if present)
const sampleNodes = [];
tree.inOrderForEach((node) => {
  if (sampleNodes.length < 3) sampleNodes.push(node.data);
});
console.log('\nSample nodes for height/depth checks:', sampleNodes);
for (const val of sampleNodes) {
  console.log(`value ${val} -> height: ${tree.height(val)}, depth: ${tree.depth(val)}`);
}

// Unbalance the tree by inserting several large numbers >100
const toAdd = [200, 210, 220, 230, 240, 250]; // intentionally large to skew tree
console.log('\nInserting values to unbalance the tree:', toAdd);
toAdd.forEach((v) => tree.insert(v));

console.log('\nPretty print after unbalancing inserts:');
prettyPrint(tree.root);
console.log('Is balanced (should be false):', tree.isBalanced());

// Rebalance the tree
console.log('\nRebalancing...');
tree.rebalance();

console.log('\nPretty print after rebalance:');
prettyPrint(tree.root);
console.log('Is balanced (should be true):', tree.isBalanced());

// Print traversals again
console.log('\nLevel-order traversal after rebalance:');
tree.levelOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n\nIn-order traversal after rebalance (sorted ascending):');
tree.inOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n\nPre-order traversal after rebalance:');
tree.preOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n\nPost-order traversal after rebalance:');
tree.postOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\n');

// Example deletes and finds
const someInOrder = [];
tree.inOrderForEach((n) => someInOrder.push(n.data));
if (someInOrder.length >= 2) {
  const deleteVal = someInOrder[Math.floor(someInOrder.length / 2)];
  console.log(`\nDeleting value ${deleteVal} (middle of in-order list) -> result:`, tree.deleteItem(deleteVal));
  console.log('Pretty print after delete:');
  prettyPrint(tree.root);
}

// Final state
console.log('\nFinal in-order traversal:');
tree.inOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log('\nAll done.');