# Binary Search Tree (BST) — The Odin Project Assignment

This project is part of The Odin Project’s JavaScript Course under the Data Structures and Algorithms section. The goal is to build a fully functional Balanced Binary Search Tree, implement core BST operations, and understand recursion, traversal techniques, and time complexity.

## 📌 Project Overview

In this assignment, you will:
* Create a Node class storing:
    - data
    - left
    -  right

* Create a Tree class that:
    - Builds a balanced BST from an input array
    - Provides insertion and deletion operations
    - Supports searching and all tree traversals
    - Calculates a node’s height and depth
    - Checks whether the tree is balanced
    - Rebalances an unbalanced tree
You’ll also write a driver script (main.js) that tests all the features.

## 🌳 Binary Search Tree Features
### ✔️ Node Class
Each node includes:
- data (number)
- left child
- right child
### ✔️ Tree Class & Methods
Tree Construction
- buildTree(array)
    Sorts, removes duplicates, and recursively builds a balanced BST.

## Core BST Operations
| Method              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `insert(value)`     | Inserts value at correct BST position                |
| `deleteItem(value)` | Removes node and restructures tree                   |
| `find(value)`       | Returns node if found                                |
| `height(value)`     | Edges in longest downward path from the node         |
| `depth(value)`      | Edges from the node to the root                      |
| `isBalanced()`      | Returns `true` if tree satisfies balance constraints |
| `rebalance()`       | Rebuilds tree using sorted traversal list            |

## Tree Traversal Methods
All traversal methods accept a callback, similar to .forEach():
| Method                  | Order               | Example                  |
| ----------------------- | ------------------- | ------------------------ |
| `levelOrderForEach(cb)` | Breadth-first       | Level 0 → 1 → 2          |
| `inOrderForEach(cb)`    | Left → Root → Right | Produces sorted list     |
| `preOrderForEach(cb)`   | Root → Left → Right | Used for copying trees   |
| `postOrderForEach(cb)`  | Left → Right → Root | Children processed first |


## 🌲 prettyPrint() Helper

This helper visually prints the tree:
└── 50
    ├── 70
    └── 30
        ├── 40
        └── 20

Call it like:
prettyPrint(tree.root);

