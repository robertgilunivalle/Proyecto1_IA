import COSTS from "../constants/costs";
import type { Object } from "../constants/objects";
import OBJECTS from "../constants/objects";
import Coordinate from "./Coordinate";
import Matrix from "./Matrix";
import { FLOWER_DEFAULT_SHOTS, STAR_DEFAULT_DURATION, WATER1L, WATER2L } from "./Mario";
class Node {
  father: Node | null = null;
  path: Node[] = [];
  position: Coordinate;
  gameState: string[][];
  depth: number = 0;
  cost: number = 0;
  accumulatedCost: number = 0;
  object: Object;
  star: { isPowered: boolean; durationLeft: number } = { isPowered: false, durationLeft: 0 };
  flower: { isPowered: boolean; shotsLeft: number } = { isPowered: false, shotsLeft: 0 };


  water1: { capacity: number, isTaken: boolean, } = {capacity: 0 , isTaken: false}
  water2: { capacity: number, isTaken: boolean, } = {capacity: 0 , isTaken: false}


  constructor(father: Node | null, position: Coordinate, gameState: string[][]) {
    this.position = position;
    this.gameState = gameState;
    this.object = Matrix.matrix[position.x][position.y] as Object;
    this.father = father;
    if (father) {
      this.water1 = { ...this.father!.water1 };
      this.water2 = { ...this.father!.water2 };

      let cost = COSTS[this.object];

      if (this.hasWater1L() && this.isFire()) {
        this.water1.capacity--;
        cost = 1;
      } if (this.hasWater2L() && this.isFire()) {
        this.water2.capacity--;
        cost = 1;
      }

      this.accumulatedCost = father.accumulatedCost + cost;
      this.path = [...father.path];
      this.depth = father.depth + 1;
    }
    if (this.isWater1LInPath() && !this.hasWater1L()) {
      this.water1.isTaken = true;
      this.water1.capacity += WATER1L;
    }
    if (this.isWater2LInPath() && !this.hasWater2L()) {
      this.water2.isTaken = true;
      this.water2.capacity += WATER2L;
    }
    if (this.isStarInPath() && !this.hasFlower()) {
      this.star.isPowered = true;
      this.star.durationLeft += STAR_DEFAULT_DURATION;
    }
    if (this.isFlowerInPath() && !this.hasStar()) {
      this.flower.isPowered = true;
      this.flower.shotsLeft += FLOWER_DEFAULT_SHOTS;
    }
    if (this.star.durationLeft === 0) this.star.isPowered = false;
    if (this.flower.shotsLeft === 0) this.flower.isPowered = false;
    if (this.water1.capacity === 0) this.water1.isTaken = false;
    if (this.water2.capacity === 0) this.water2.isTaken = false;
    this.path.push(this);
  }

  public isBlank(): boolean {
    return this.object === OBJECTS.BLANK;
  }

  public isWall(): boolean {
    return this.object === OBJECTS.WALL;
  }

  public isPlayer(): boolean {
    return this.object === OBJECTS.PLAYER;
  }

  public isStar(): boolean {
    return this.object === OBJECTS.STAR;
  }
  public isFire(): boolean {
    return this.object === OBJECTS.FIRE;
  }

  public isWater1L(): boolean {
    return this.object === OBJECTS.WATER1L;
  }

  public isWater2L(): boolean {
    return this.object === OBJECTS.WATER2L;
  }

  public isFlower(): boolean {
    return this.object === OBJECTS.FLOWER;
  }

  public isBowser(): boolean {
    return this.object === OBJECTS.BOWSER;
  }

  public isPrincess(): boolean {
    return this.object === OBJECTS.PRINCESS;
  }

  public hasStar(): boolean {
    return this.star.isPowered;
  }

  public hasFlower(): boolean {
    return this.flower.isPowered;
  }

  public hasWater1L(): boolean {
    return this.water1.isTaken;
  }
  public hasWater2L(): boolean {
    return this.water2.isTaken;
  }
  public isHydrant(): boolean {
    return this.object === OBJECTS.HYDRANT;
  }

  public isWater1LInPath(): boolean {
    return this.isWater1L() && !this.path.find(n => n.position.x === this.position.x && n.position.y === this.position.y);
  }
  public isWater2LInPath(): boolean {
    return this.isWater2L() && !this.path.find(n => n.position.x === this.position.x && n.position.y === this.position.y);
  }

  public isStarInPath(): boolean {
    return this.isStar() && !this.path.find(n => n.position.x === this.position.x && n.position.y === this.position.y);
  }

  public isFlowerInPath(): boolean {
    return (
      this.isFlower() && !this.path.find(n => n.position.x === this.position.x && n.position.y === this.position.y)
    );
  }
}

export default Node;
