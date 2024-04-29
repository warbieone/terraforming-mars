"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preservingShuffle = exports.BoardBuilder = void 0;
const Types_1 = require("../../common/Types");
const SpaceName_1 = require("../SpaceName");
const SpaceType_1 = require("../../common/boards/SpaceType");
const shuffle_1 = require("../utils/shuffle");
function colonySpace(id) {
    return { id, spaceType: SpaceType_1.SpaceType.COLONY, x: -1, y: -1, bonus: [] };
}
class BoardBuilder {
    constructor(includeVenus, includePathfinders) {
        this.includeVenus = includeVenus;
        this.includePathfinders = includePathfinders;
        this.spaceTypes = [];
        this.bonuses = [];
        this.spaces = [];
        this.unshufflableSpaces = [];
    }
    ocean(...bonus) {
        this.spaceTypes.push(SpaceType_1.SpaceType.OCEAN);
        this.bonuses.push(bonus);
        return this;
    }
    cove(...bonus) {
        this.spaceTypes.push(SpaceType_1.SpaceType.COVE);
        this.bonuses.push(bonus);
        return this;
    }
    land(...bonus) {
        this.spaceTypes.push(SpaceType_1.SpaceType.LAND);
        this.bonuses.push(bonus);
        return this;
    }
    restricted() {
        this.spaceTypes.push(SpaceType_1.SpaceType.RESTRICTED);
        this.bonuses.push([]);
        return this;
    }
    doNotShuffleLastSpace() {
        this.unshufflableSpaces.push(this.spaceTypes.length - 1);
        return this;
    }
    build() {
        this.spaces.push(colonySpace(SpaceName_1.SpaceName.GANYMEDE_COLONY));
        this.spaces.push(colonySpace(SpaceName_1.SpaceName.PHOBOS_SPACE_HAVEN));
        const tilesPerRow = [5, 6, 7, 8, 9, 8, 7, 6, 5];
        const idOffset = this.spaces.length + 1;
        let idx = 0;
        for (let row = 0; row < 9; row++) {
            const tilesInThisRow = tilesPerRow[row];
            const xOffset = 9 - tilesInThisRow;
            for (let i = 0; i < tilesInThisRow; i++) {
                const spaceId = idx + idOffset;
                const xCoordinate = xOffset + i;
                const space = {
                    id: BoardBuilder.spaceId(spaceId),
                    spaceType: this.spaceTypes[idx],
                    x: xCoordinate,
                    y: row,
                    bonus: this.bonuses[idx],
                };
                this.spaces.push(space);
                idx++;
            }
        }
        this.spaces.push(colonySpace(SpaceName_1.SpaceName.STANFORD_TORUS));
        if (this.includeVenus) {
            this.spaces.push(colonySpace(SpaceName_1.SpaceName.DAWN_CITY), colonySpace(SpaceName_1.SpaceName.LUNA_METROPOLIS), colonySpace(SpaceName_1.SpaceName.MAXWELL_BASE), colonySpace(SpaceName_1.SpaceName.STRATOPOLIS));
        }
        if (this.includePathfinders) {
            this.spaces.push(colonySpace(SpaceName_1.SpaceName.CERES_SPACEPORT), colonySpace(SpaceName_1.SpaceName.DYSON_SCREENS), colonySpace(SpaceName_1.SpaceName.LUNAR_EMBASSY), colonySpace(SpaceName_1.SpaceName.VENERA_BASE));
        }
        return this.spaces;
    }
    shuffle(rng, ...preservedSpaceIds) {
        const preservedSpaces = [...this.unshufflableSpaces];
        for (const spaceId of preservedSpaceIds) {
            const idx = Number(spaceId) - 3;
            if (!preservedSpaces.includes(idx)) {
                preservedSpaces.push(idx);
            }
        }
        preservedSpaces.sort((a, b) => a - b);
        preservingShuffle(this.spaceTypes, preservedSpaces, rng);
        preservingShuffle(this.bonuses, this.unshufflableSpaces, rng);
        return;
    }
    static spaceId(id) {
        let strId = id.toString();
        if (id < 10) {
            strId = '0' + strId;
        }
        return (0, Types_1.safeCast)(strId, Types_1.isSpaceId);
    }
}
exports.BoardBuilder = BoardBuilder;
function preservingShuffle(array, preservedIndexes, rng) {
    const forward = [...preservedIndexes].sort((a, b) => a - b);
    const backward = [...forward].reverse();
    const spliced = backward.map((idx) => array.splice(idx, 1)[0]).reverse();
    (0, shuffle_1.inplaceShuffle)(array, rng);
    for (let idx = 0; idx < forward.length; idx++) {
        array.splice(forward[idx], 0, spliced[idx]);
    }
}
exports.preservingShuffle = preservingShuffle;
