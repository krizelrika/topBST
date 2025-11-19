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
}

