import OBJECTS from "../constants/objects";
import Mario from "./Mario";
import Node from "./Node";
import fireFighter from "./fireFighter";
class Solution {
  private static _cost: number = 0;
  private static _solution: Node[] = [];
  private static _staticPath: Node[] = [];
  private static _expandedNodes: Node[] = [];
  private static _treeDepth: number = 0;

  constructor() {}

  static set cost(cost: number) {
    Solution._cost = cost;
  }

  static get cost() {
    return this._cost;
  }

  static set solution(solution: Node[]) {
    Solution._solution = solution;
  }

  static get solution() {
    return this._solution;
  }

  static set staticPath(staticPath: Node[]) {
    Solution._staticPath = staticPath;
  }

  static get staticPath() {
    return this._staticPath;
  }

  static set expandedNodes(expandedNodes: Node[]) {
    Solution._expandedNodes = expandedNodes;
  }

  static get expandedNodes() {
    return this._expandedNodes;
  }

  static set treeDepth(treeDepth: number) {
    Solution._treeDepth = treeDepth;
  }

  static get treeDepth() {
    return this._treeDepth;
  }

  static buildSolution() {
    Solution.solution.forEach(Solution.buildNodeCost);
    Solution.buildTotalCost();
    Solution.buildTreeDepth();
    Solution.solution.shift();
  }

  static buildTreeDepth() {
    Solution.expandedNodes.forEach(node => {
      if (node.depth > Solution.treeDepth) {
        Solution.treeDepth = node.depth;
      }
    });
  }

  static buildNodeCost(node: Node): void {
    switch (node.object) {
      case OBJECTS.BLANK:
        node.cost += fireFighter.hasWater1L() ? 2 : 1;
        node.cost += fireFighter.hasWater2L() ? 3 : 1;
        break;
      case OBJECTS.WATER1L:
        if (fireFighter.hasWater1L()) {
          node.cost -= 1;
        } 
        if (fireFighter.hasWater2L()) {
          node.cost -= 1;
        }  else {
          node.cost += 6;
        }
        break;

      case OBJECTS.WATER1L:
        node.cost += fireFighter.hasWater1L() ? 2 : 1;
        fireFighter.foundFireWater1L;
        break;
      case OBJECTS.WATER2L:
        node.cost += fireFighter.hasWater2L() ? 3 : 1;
        fireFighter.foundFireWater2L();
        break;
      default:
        node.cost += 0;
        break;
    }
  }

  static buildTotalCost() {
    Solution.cost = Solution.staticPath[Solution.staticPath.length - 1].accumulatedCost;
  }

  static reset() {
    Solution.cost = 0;
    Solution.solution = [];
    Solution.staticPath = [];
    Solution.expandedNodes = [];
    Solution.treeDepth = 0;
  }
}

export default Solution;
