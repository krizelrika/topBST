class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class Tree {
  constructor(array = []) {
    // build a balanced BST from the supplied array (sort + remove duplicates)
    this.root = this.buildTree(array);
  }

  // Build balanced BST from array: sort, deduplicate, then recursive mid split
  buildTree(array) {
    if (!Array.isArray(array)) return null;
    // create a sorted unique array
    const sortedUnique = Array.from(new Set(array)).sort((a, b) => a - b);
    // recursive helper
    const build = (arr, start = 0, end = arr.length - 1) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);
      node.left = build(arr, start, mid - 1);
      node.right = build(arr, mid + 1, end);
      return node;
    };
    return build(sortedUnique, 0, sortedUnique.length - 1);
  }

  // Helper to find the in-order successor (minimum node in right subtree)
  _minNode(node) {
    if (!node) return null;
    while (node.left) node = node.left;
    return node;
  }

  // Insert a value into the BST (ignore duplicates)
  insert(value) {
    if (value === undefined || value === null) return;
    const insertRec = (node, val) => {
      if (!node) return new Node(val);
      if (val === node.data) {
        // duplicate — ignore (spec asks to avoid duplicates)
        return node;
      } else if (val < node.data) {
        node.left = insertRec(node.left, val);
      } else {
        node.right = insertRec(node.right, val);
      }
      return node;
    };
    this.root = insertRec(this.root, value);
  }

  deleteItem(value) {
    const deleteRec = (node, val) => {
      if (!node) return null;
      if (val < node.data) {
        node.left = deleteRec(node.left, val);
      } else if (val > node.data) {
        node.right = deleteRec(node.right, val);
      } else {
        // node to delete found
        // case 1: no child
        if (!node.left && !node.right) return null;
        // case 2: one child
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // case 3: two children -> replace with successor (smallest in right subtree)
        const successor = this._minNode(node.right);
        node.data = successor.data;
        node.right = deleteRec(node.right, successor.data);
      }
      return node;
    };

    // check presence first -> if not present, return false
    if (this.find(value) === null) return false;
    this.root = deleteRec(this.root, value);
    return true;
  }

  // Find and return the node containing the value; return null if not found
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) return current;
      current = value < current.data ? current.left : current.right;
    }
    return null;
  }

  // Level-order traversal (breadth-first). callback(node) required.
  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('levelOrderForEach requires a callback function as argument');
    }
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

   // In-order traversal (left, root, right)
  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('inOrderForEach requires a callback function as argument');
    }
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    };
    traverse(this.root);
  }

  // Pre-order traversal (root, left, right)
  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('preOrderForEach requires a callback function as argument');
    }
    const traverse = (node) => {
      if (!node) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  // Post-order traversal (left, right, root)
  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('postOrderForEach requires a callback function as argument');
    }
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    };
    traverse(this.root);
  }

  // Helper: compute height of a node reference (number of edges in longest path to leaf)
  _nodeHeight(node) {
    if (!node) return -1; // height of null is -1 so leaf node has height 0
    const leftH = this._nodeHeight(node.left);
    const rightH = this._nodeHeight(node.right);
    return Math.max(leftH, rightH) + 1;
  }

  // Height of node containing value: returns number of edges to deepest leaf; null if value not found
  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this._nodeHeight(node);
  }

  // Depth of a node containing value: number of edges from root to the node; null if not found
  depth(value) {
    let current = this.root;
    let depth = 0;
    while (current) {
      if (value === current.data) return depth;
      current = value < current.data ? current.left : current.right;
      depth++;
    }
    return null;
  }

  // isBalanced: check every node for balance property
  // Efficient approach: return -1 if subtree not balanced; else return height
  _checkBalance(node) {
    if (!node) return 0;
    const leftH = this._checkBalance(node.left);
    if (leftH === -1) return -1;
    const rightH = this._checkBalance(node.right);
    if (rightH === -1) return -1;
    if (Math.abs(leftH - rightH) > 1) return -1;
    return Math.max(leftH, rightH) + 1;
  }

  isBalanced() {
    return this._checkBalance(this.root) !== -1;
  }

  // rebalance: get sorted unique array via in-order traversal and rebuild tree
  rebalance() {
    const arr = [];
    this.inOrderForEach((node) => arr.push(node.data));
    this.root = this.buildTree(arr);
  }

}

export { Node, Tree, prettyPrint };

