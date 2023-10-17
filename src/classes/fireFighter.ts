import Coordinate from "./Coordinate";


export const WATER1L= 0;
export const WATER2L = 0;
export const WATER1LFILLED= 1;
export const WATER2LFILLED = 2;



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

  static foundHydrantWater1(): void {
    const HAS_WATER: boolean = fireFighter._conditions1.water.isTaken;
    if (HAS_WATER) return;
    fireFighter._conditions1 = {
        ...fireFighter._conditions1,
        water: {
          capacity: fireFighter._conditions1.water.capacity + WATER1LFILLED,
          isTaken: true,
        },
      };

  }
  static foundHydrantWater2(): void {
    const HAS_WATER: boolean = fireFighter._conditions2.water.isTaken;
    if (HAS_WATER) return;
    fireFighter._conditions2 = {
        ...fireFighter._conditions2,
        water: {
          capacity: fireFighter._conditions2.water.capacity + WATER2LFILLED,
          isTaken: true,
        },
      };
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
export default fireFighter;