import Coordinate from "./Coordinate";

export const STAR_DEFAULT_DURATION = 6;
export const FLOWER_DEFAULT_SHOTS = 1;
export const WATER1L= 0;
export const WATER2L = 0;


interface Powers {
  star: {
    durationLeft: number;
    isPoweredUp: boolean;
  };
  flower: {
    shotsLeft: number;
    isPoweredUp: boolean;
  };
}

interface condition {
  water: {
    capacity: number;
    isTaken: boolean;
  };
}

const INITIAL_STATE_WATER1: condition = {
  water: {
    capacity: 0,
    isTaken: false,
  }
}
const INITIAL_STATE_WATER2: condition = {
  water: {
    capacity: 0,
    isTaken: false,
  }
}

const INITIAL_POWERUPS: Powers = {
  star: {
    durationLeft: 0,
    isPoweredUp: false,
  },
  flower: {
    shotsLeft: 0,
    isPoweredUp: false,
  },
};


class fireFighter {
  private static _position: Coordinate;
  private static _conditions1: condition = INITIAL_STATE_WATER1;
  private static _conditions2: condition = INITIAL_STATE_WATER2;

  constructor(position: Coordinate) {
    fireFighter._position = position;
  }

  static set position(position: Coordinate) {
    fireFighter._position = position;
  }

  static get position(): Coordinate {
    return fireFighter._position;
  }

  static get conditions1l (): condition {
    return fireFighter._conditions1;
  }
  static get conditions2l (): condition {
    return fireFighter._conditions2;
  }


  static hasWater1L(): boolean {
    if (this._conditions1.water.isTaken) {
      fireFighter.useWater1L();
      return true;
    }
    return false;
  }

  static hasWater2L(): boolean {
    if (this._conditions2.water.isTaken) {
      fireFighter.useWater2L();
      return true;
    }
    return false;
  }



  static foundFireWater1L(): void {
    const HAS_WATER: boolean = fireFighter._conditions1.water.isTaken;
    if (HAS_WATER) return;

    fireFighter._conditions1 = {
      ...fireFighter._conditions1,
      water: {
        capacity: fireFighter._conditions1.water.capacity + WATER1L,
        isTaken: true,
      },
    };
  }

  static foundFireWater2L(): void {
    const HAS_WATER: boolean = fireFighter._conditions2.water.isTaken;
    if (HAS_WATER) return;

    fireFighter._conditions2 = {
      ...fireFighter._conditions2,
      water: {
        capacity: fireFighter._conditions2.water.capacity + WATER2L,
        isTaken: true,
      },
    };
  }
  private static useWater1L(): void {
    fireFighter._conditions1.water.capacity -= 1;
    fireFighter._conditions1.water.isTaken = fireFighter.isWater1Available();

  }
  private static useWater2L(): void {
    fireFighter._conditions2.water.capacity -= 1;
    fireFighter._conditions2.water.isTaken = fireFighter.isWater2Available();
  }


  private static isWater1Available(): boolean {
    return fireFighter._conditions1.water.capacity !== 0;
  }
  private static isWater2Available(): boolean {
    return fireFighter._conditions2.water.capacity !== 0;
  }
  static reset() {
    fireFighter._conditions1= INITIAL_STATE_WATER1;
    fireFighter._conditions2= INITIAL_STATE_WATER2;
  }
}

class Mario {
  private static _position: Coordinate;
  private static _powerUps: Powers = INITIAL_POWERUPS;

  constructor(position: Coordinate) {
    Mario._position = position;
  }

  static set position(position: Coordinate) {
    Mario._position = position;
  }

  static get position(): Coordinate {
    return Mario._position;
  }

  static get powerUps(): Powers {
    return Mario._powerUps;
  }

  static hasStar(): boolean {
    if (this._powerUps.star.isPoweredUp) {
      Mario.useStarPowerUp();
      return true;
    }
    return false;
  }

  static hasFlower(): boolean {
    if (this._powerUps.flower.isPoweredUp) {
      Mario.useFlowerPowerUp();
      return true;
    }
    return false;
  }

  static foundStarPowerUp(): void {
    const HAS_FLOWER: boolean = Mario._powerUps.flower.isPoweredUp;
    if (HAS_FLOWER) return;

    Mario._powerUps = {
      ...Mario._powerUps,
      star: {
        durationLeft: Mario._powerUps.star.durationLeft + STAR_DEFAULT_DURATION,
        isPoweredUp: true,
      },
    };
  }

  static foundFlowerPowerUp(): void {
    const HAS_STAR: boolean = Mario._powerUps.star.isPoweredUp;
    if (HAS_STAR) return;

    Mario._powerUps = {
      ...Mario._powerUps,
      flower: {
        shotsLeft: Mario._powerUps.flower.shotsLeft + FLOWER_DEFAULT_SHOTS,
        isPoweredUp: true,
      },
    };
  }

  private static useStarPowerUp(): void {
    Mario._powerUps.star.durationLeft -= 1;
    Mario._powerUps.star.isPoweredUp = Mario.isStarAvailable();
  }

  private static useFlowerPowerUp(): void {
    Mario._powerUps.flower.shotsLeft -= 1;
    Mario._powerUps.flower.isPoweredUp = Mario.isFlowerAvailable();
  }

 

  private static isStarAvailable(): boolean {
    return Mario._powerUps.star.durationLeft !== 0;
  }

  private static isFlowerAvailable(): boolean {
    return Mario._powerUps.flower.shotsLeft !== 0;
  }

  static reset() {
    Mario._powerUps = INITIAL_POWERUPS;
  }
}

export default Mario; fireFighter;
