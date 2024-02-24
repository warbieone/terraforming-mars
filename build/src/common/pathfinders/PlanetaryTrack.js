"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackBuilder = void 0;
class TrackBuilder {
    constructor(size) {
        this.spaces = [];
        for (let idx = 0; idx <= size; idx++) {
            this.spaces.push({
                risingPlayer: [],
                everyone: [],
                mostTags: [],
            });
        }
        this.currentSpace = 0;
    }
    at(space) {
        this.currentSpace = space;
        return this;
    }
    everyone(...rewards) {
        this.spaces[this.currentSpace].everyone = rewards;
        return this;
    }
    risingPlayer(...rewards) {
        this.spaces[this.currentSpace].risingPlayer = rewards;
        return this;
    }
    mostTags(...rewards) {
        this.spaces[this.currentSpace].mostTags = rewards;
        return this;
    }
    build() {
        return {
            spaces: this.spaces,
        };
    }
}
exports.TrackBuilder = TrackBuilder;
