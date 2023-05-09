"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstRandom = exports.UnseededRandom = exports.SeededRandom = exports.Random = void 0;
class Random {
    nextInt(range) {
        return Math.floor(this.next() * range);
    }
}
exports.Random = Random;
class SeededRandom extends Random {
    constructor(seed = 0, currentSeed) {
        super();
        this.seed = seed;
        this.currentSeed = currentSeed !== null && currentSeed !== void 0 ? currentSeed : Math.floor(seed * 4294967296);
    }
    get current() {
        return this.currentSeed;
    }
    next() {
        let t = this.currentSeed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
exports.SeededRandom = SeededRandom;
class UnseededRandom extends Random {
    next() {
        return Math.random();
    }
}
exports.UnseededRandom = UnseededRandom;
UnseededRandom.INSTANCE = new UnseededRandom();
class ConstRandom extends Random {
    constructor(float) {
        super();
        if (float < 0 || float > 1) {
            throw new Error('Supply a value between 0 and 1.');
        }
        this.float = float;
    }
    next() {
        return this.float;
    }
}
exports.ConstRandom = ConstRandom;
