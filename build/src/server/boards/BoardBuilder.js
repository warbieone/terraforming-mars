"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardBuilder = void 0;
const Space_1 = require("./Space");
const SpaceName_1 = require("../SpaceName");
const SpaceType_1 = require("../../common/boards/SpaceType");
function colonySpace(id) {
    return (0, Space_1.newSpace)(id, SpaceType_1.SpaceType.COLONY, -1, -1, []);
}
class BoardBuilder {
    constructor(includeVenus, includePathfinders) {
        this.includeVenus = includeVenus;
        this.includePathfinders = includePathfinders;
        this.spaceTypes = [];
        this.bonuses = [];
        this.spaces = [];
        this.unshufflableSpaces = [];
        this.spaces.push(colonySpace(SpaceName_1.SpaceName.GANYMEDE_COLONY));
        this.spaces.push(colonySpace(SpaceName_1.SpaceName.PHOBOS_SPACE_HAVEN));
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
        const tilesPerRow = [5, 6, 7, 8, 9, 8, 7, 6, 5];
        const idOffset = this.spaces.length + 1;
        let idx = 0;
        for (let row = 0; row < 9; row++) {
            const tilesInThisRow = tilesPerRow[row];
            const xOffset = 9 - tilesInThisRow;
            for (let i = 0; i < tilesInThisRow; i++) {
                const spaceId = idx + idOffset;
                const xCoordinate = xOffset + i;
                const space = (0, Space_1.newSpace)(BoardBuilder.spaceId(spaceId), this.spaceTypes[idx], xCoordinate, row, this.bonuses[idx]);
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
    shuffleArray(rng, array) {
        this.unshufflableSpaces.sort((a, b) => a < b ? a : b);
        const spliced = this.unshufflableSpaces.reverse().map((idx) => array.splice(idx, 1)[0]).reverse();
        for (let i = array.length - 1; i > 0; i--) {
            const j = rng.nextInt(i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        for (let idx = 0; idx < this.unshufflableSpaces.length; idx++) {
            array.splice(this.unshufflableSpaces[idx], 0, spliced[idx]);
        }
    }
    shuffle(rng, ...lands) {
        this.shuffleArray(rng, this.spaceTypes);
        this.shuffleArray(rng, this.bonuses);
        let safety = 0;
        while (safety < 1000) {
            let satisfy = true;
            for (const land of lands) {
                const land_id = Number(land) - 3;
                while (this.spaceTypes[land_id] === SpaceType_1.SpaceType.OCEAN) {
                    satisfy = false;
                    const idx = rng.nextInt(this.spaceTypes.length);
                    [this.spaceTypes[land_id], this.spaceTypes[idx]] = [this.spaceTypes[idx], this.spaceTypes[land_id]];
                }
            }
            if (satisfy)
                return;
            safety++;
        }
        throw new Error('infinite loop detected');
    }
    static spaceId(id) {
        let strId = id.toString();
        if (id < 10) {
            strId = '0' + strId;
        }
        return strId;
    }
}
exports.BoardBuilder = BoardBuilder;
