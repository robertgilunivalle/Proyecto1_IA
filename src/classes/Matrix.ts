import OBJECTS from "../constants/objects";
import Objects, { type Object } from "../constants/objects";
import Coordinate from "./Coordinate";
import Mario from "./Mario";
import { STAR_DEFAULT_DURATION, FLOWER_DEFAULT_SHOTS } from "./Mario";
import Solution from "./Solution";
import Node from "./Node";

const INITIAL_STAR_POWERUP = {
  isPowered: false,
  duration: 0,
};
const INITIAL_FLOWER_POWERUP = {
  isPowered: false,
  shots: 0,
};

let star = INITIAL_STAR_POWERUP;
let flower = INITIAL_FLOWER_POWERUP;
let unpoweredCoordinates: Coordinate[] = [];

//TODO: Solve image rendering
class Matrix {
  static matrix: Object[][] = [];
  static element: HTMLElement;

  constructor(matrix: string) {
    const array: Object[] = matrix.split("\n") as Object[];
    Matrix.matrix = array.map(a => a.split(" ")) as Object[][];
    Matrix.element = document.querySelector(".matrix")!;
    this.buildGame();
  }

  public static getObject(position: Coordinate): string {
    return Matrix.matrix[position.x][position.y];
  }

  private buildGame(): void {
    let game: string = "";
    Matrix.matrix.forEach((row, rowIdx) => {
      game += `<div class="row">`;
      row.forEach((item, itemIdx) => {
        switch (item) {
          case OBJECTS.BLANK:
            game += `<span class="item c${rowIdx}-${itemIdx}"></span>`;
            break;
          case OBJECTS.PLAYER:
            game += `<img id="mario" class="item c${rowIdx}-${itemIdx}" src=${`/${item}.png`}/>`;
            break;
          default:
            game += `<img class="item c${rowIdx}-${itemIdx}" src=${`/${item}.png`}/>`;
            break;
        }
      });
      game += `</div>`;
    });
    Matrix.element.innerHTML = game;
  }

  static isEmpty(): boolean {
    return !Matrix.matrix.length;
  }

  static updateGame(currentCoordinate: Coordinate, nextCoordinate: Coordinate) {
    Mario.position = nextCoordinate;
    const MarioElement = document.querySelector(`.c${currentCoordinate.x}-${currentCoordinate.y}`)! as HTMLImageElement;
    const span = document.createElement("span");
    span.classList.add("item");
    span.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);

    if (Matrix.getObject(currentCoordinate) === Objects.BOWSER && !star.isPowered && !flower.isPowered) {
      const currentImg = document.createElement("img");
      currentImg.classList.add("item");
      currentImg.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
      currentImg.src = `/${OBJECTS.BOWSER}.png`;
      MarioElement.replaceWith(currentImg);
    } else if (
      Matrix.getObject(currentCoordinate) === Objects.STAR &&
      flower.isPowered &&
      unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y)
    ) {
      const currentImg = document.createElement("img");
      currentImg.classList.add("item");
      currentImg.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
      currentImg.src = `/${OBJECTS.STAR}.png`;
      MarioElement.replaceWith(currentImg);
    } else if (
      Matrix.getObject(currentCoordinate) === Objects.FLOWER &&
      star.isPowered &&
      unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y)
    ) {
      const currentImg = document.createElement("img");
      currentImg.classList.add("item");
      currentImg.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
      currentImg.src = `/${OBJECTS.FLOWER}.png`;
      MarioElement.replaceWith(currentImg);
    } else {
      MarioElement.replaceWith(span);
    }
    if (star.duration === 0) star.isPowered = false;
    if (flower.shots === 0) flower.isPowered = false;

    const nextMarioElement = document.querySelector(`.c${nextCoordinate.x}-${nextCoordinate.y}`)! as HTMLImageElement;
    const nextImg = document.createElement("img");
    nextImg.classList.add("item");
    nextImg.classList.add(`c${nextCoordinate.x}-${nextCoordinate.y}`);

    if (Matrix.getObject(nextCoordinate) === OBJECTS.PRINCESS) {
      nextImg.src = `/goal.png`;
    } else if (star.isPowered) {
      nextImg.src = `/2-star.png`;
      star.duration -= 1;
    } else if (flower.isPowered) {
      nextImg.src = `/2-flower.png`;
      if (Matrix.getObject(nextCoordinate) === OBJECTS.BOWSER) flower.shots -= 1;
    } else {
      nextImg.src = `/${OBJECTS.PLAYER}.png`;
    }

    switch (Matrix.getObject(nextCoordinate)) {
      case OBJECTS.PRINCESS:
        nextImg.src = `/goal.png`;
        break;
      case OBJECTS.STAR:
        if (flower.isPowered || !!unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y))
          break;
        nextImg.src = `/2-star.png`;
        star.isPowered = true;
        unpoweredCoordinates.push(nextCoordinate);
        console.log(
          "solution",
          Solution.solution.map(n => n)
        );
        star.duration += STAR_DEFAULT_DURATION;
        break;
      case OBJECTS.FLOWER:
        if (star.isPowered || !!unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y))
          break;
        nextImg.src = `/2-flower.png`;
        flower.isPowered = true;
        unpoweredCoordinates.push(nextCoordinate);
        flower.shots += FLOWER_DEFAULT_SHOTS;
        break;
      default:
        break;
    }
    console.log("star", { ...star });
    console.log("flower", { ...flower });

    nextMarioElement.replaceWith(nextImg);
  }

  static updateGameStats() {
    document.querySelector(".stats__layout")?.classList.add("show");
    const nodes = document.querySelector(".stats__nodes") as HTMLDivElement;
    const nodesQty = document.querySelector(".stats__nodes__quantity") as HTMLDivElement;
    let path: string = "";
    Solution.staticPath.forEach((node, idx, arr) => {
      if (idx === arr.length - 1) path += `<span class="stats__node">(${node.position.x},${node.position.y})</span>`;
      else path += `<span class="stats__node">(${node.position.x},${node.position.y}),</span>`;
    });
    nodes.innerHTML += path;
    nodesQty.innerHTML = Solution.staticPath.length.toString();

    const expandedNodes = document.querySelector(".stats__expanded") as HTMLDivElement;
    let expandedNodesContainer: string = "";
    Solution.expandedNodes.forEach((node, idx, arr) => {
      if (idx === arr.length - 1)
        expandedNodesContainer += `<span class="stats__node">(${node.position.x},${node.position.y})</span>`;
      else expandedNodesContainer += `<span class="stats__node">(${node.position.x},${node.position.y}),</span>`;
    });
    const expandedNodesQty = document.querySelector(".stats__expanded__quantity") as HTMLDivElement;
    expandedNodesQty.innerHTML = Solution.expandedNodes.length.toString();
    expandedNodes.innerHTML += expandedNodesContainer;

    const treeDepth = document.querySelector(".stats__tree__depth") as HTMLDivElement;
    treeDepth.innerHTML = Solution.treeDepth.toString();

    const cost = document.querySelector(".stats__cost") as HTMLDivElement;
    cost.innerHTML = Solution.cost.toString();
  }

  private static clearGameStats() {
    document.querySelector(".stats__nodes")!.replaceChildren("");
    document.querySelector(".stats__nodes__quantity")!.replaceChildren("");
    document.querySelector(".stats__expanded")!.replaceChildren("");
    document.querySelector(".stats__expanded__quantity")!.replaceChildren("");
    document.querySelector(".stats__tree__depth")!.replaceChildren("");
    document.querySelector(".stats__cost")!.replaceChildren("");
    document.querySelector(".stats__time")!.replaceChildren("");
  }

  private static clearPowerups() {
    star.isPowered = false;
    star.duration = 0;
    flower.isPowered = false;
    flower.shots = 0;
    unpoweredCoordinates = [];
  }

  static clear() {
    Matrix.clearGameStats();
    Matrix.clearPowerups();
  }

  static findPlayer(): Coordinate {
    let playerPosition: Coordinate;
    Matrix.matrix.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item !== Objects.PLAYER) return;
        playerPosition = new Coordinate(rowIdx, itemIdx);
      });
    });
    return playerPosition!;
  }

  static findPrincess(): Coordinate {
    let playerPosition: Coordinate;
    Matrix.matrix.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item !== Objects.PRINCESS) return;
        playerPosition = new Coordinate(rowIdx, itemIdx);
      });
    });
    return playerPosition!;
  }

  static heuristicValue(coordinates: Coordinate): number {
    const coordinatePrincess: Coordinate = Matrix.findPrincess();
    let manhattanDistance: number =
      Math.abs(coordinatePrincess.y - coordinates.y) + Math.abs(coordinatePrincess.x - coordinates.x);
    return manhattanDistance / 2;
  }

  static costAndHeuristicValue(node: Node): number {
    let costAndHeuristic = 0;
    costAndHeuristic = Matrix.heuristicValue(node.position) + node.accumulatedCost;
    return costAndHeuristic;
  }
}

export default Matrix;
