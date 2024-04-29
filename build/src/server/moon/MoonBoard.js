"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonBoard = void 0;
const Board_1 = require("../boards/Board");
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceType_1 = require("../../common/boards/SpaceType");
const MoonSpaces_1 = require("../../common/moon/MoonSpaces");
const Types_1 = require("../../common/Types");
const BoardBuilder_1 = require("../../server/boards/BoardBuilder");
function colonySpace(id) {
    return { id, spaceType: SpaceType_1.SpaceType.COLONY, x: -1, y: -1, bonus: [] };
}
class MoonBoard extends Board_1.Board {
    getAvailableSpacesForMine(player) {
        const spaces = this.spaces.filter((space) => {
            const val = space.tile === undefined &&
                space.spaceType === SpaceType_1.SpaceType.LUNAR_MINE &&
                space.id !== MoonSpaces_1.MoonSpaces.MARE_IMBRIUM &&
                space.id !== MoonSpaces_1.MoonSpaces.MARE_SERENITATIS &&
                space.id !== MoonSpaces_1.MoonSpaces.MARE_NUBIUM &&
                space.id !== MoonSpaces_1.MoonSpaces.MARE_NECTARIS &&
                (space.player === undefined || space.player.id === player.id);
            return val;
        });
        return spaces;
    }
    static newInstance(gameOptions, rng) {
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        const b = new Builder();
        b.row(2).land().land(STEEL, DRAW_CARD).land().mine(TITANIUM);
        b.row(1).mine(TITANIUM, TITANIUM).mine().land(STEEL).land().land();
        b.row(0).mine().land(STEEL).land(STEEL, TITANIUM).mine().mine(TITANIUM).land(STEEL, STEEL);
        b.row(0).land(STEEL).land().land().mine(TITANIUM).mine(TITANIUM);
        b.row(0).land().mine(TITANIUM).mine().land().mine().land(STEEL);
        b.row(1).land().land(STEEL).land(STEEL).land(DRAW_CARD, DRAW_CARD).land(STEEL);
        b.row(2).land(DRAW_CARD, DRAW_CARD).mine(TITANIUM).mine(TITANIUM, TITANIUM).land();
        if (gameOptions.shuffleMapOption !== undefined && gameOptions.shuffleMapOption) {
            b.shuffle(rng, MoonSpaces_1.MoonSpaces.MARE_IMBRIUM, MoonSpaces_1.MoonSpaces.MARE_NECTARIS, MoonSpaces_1.MoonSpaces.MARE_NUBIUM, MoonSpaces_1.MoonSpaces.MARE_SERENITATIS);
        }
        const spaces = b.build();
        return new MoonBoard(spaces);
    }
    constructor(spaces) {
        super(spaces, undefined, []);
    }
}
exports.MoonBoard = MoonBoard;
class Builder {
    constructor() {
        this.y = -1;
        this.x = 0;
        this.spaceTypes = [];
        this.bonuses = [];
        this.spaces = [];
        this.idx = 0;
    }
    row(startX) {
        this.y++;
        this.x = startX;
        return new Row(this);
    }
    colony() {
        this.spaceTypes.push(SpaceType_1.SpaceType.COLONY);
        this.bonuses.push([]);
    }
    nextId() {
        this.idx++;
        const strId = this.idx.toString().padStart(2, '0');
        return (0, Types_1.safeCast)('m' + strId, Types_1.isSpaceId);
    }
    build() {
        this.spaces.push(colonySpace(MoonSpaces_1.MoonSpaces.LUNA_TRADE_STATION));
        const tilesPerRow = [4, 5, 6, 5, 6, 5, 4];
        const idOffset = this.spaces.length + 1;
        let idx = 0;
        for (let row = 0; row < tilesPerRow.length; row++) {
            const tilesInThisRow = tilesPerRow[row];
            const xOffset = row === 3 ? 0 : 6 - tilesInThisRow;
            for (let i = 0; i < tilesInThisRow; i++) {
                const spaceId = idx + idOffset;
                const xCoordinate = xOffset + i;
                const space = {
                    id: Builder.spaceId(spaceId),
                    spaceType: this.spaceTypes[idx],
                    x: xCoordinate,
                    y: row,
                    bonus: this.bonuses[idx],
                };
                this.spaces.push(space);
                idx++;
            }
        }
        this.spaces.push(colonySpace(MoonSpaces_1.MoonSpaces.MOMENTUM_VIRIUM));
        return this.spaces;
    }
    shuffle(rng, ...preservedSpaceIds) {
        const preservedSpaces = [];
        for (const spaceId of preservedSpaceIds) {
            const idx = Number(spaceId.substring(1, 3));
            preservedSpaces.push(idx - 2);
        }
        preservedSpaces.sort((a, b) => a - b);
        (0, BoardBuilder_1.preservingShuffle)(this.spaceTypes, preservedSpaces, rng);
        (0, BoardBuilder_1.preservingShuffle)(this.bonuses, preservedSpaces, rng);
        return;
    }
    static spaceId(id) {
        let strId = id.toString();
        if (id < 10) {
            strId = '0' + strId;
        }
        return (0, Types_1.safeCast)('m' + strId, Types_1.isSpaceId);
    }
}
class Row {
    constructor(builder) {
        this.builder = builder;
    }
    land(...bonuses) {
        this.builder.spaceTypes.push(SpaceType_1.SpaceType.LAND);
        this.builder.bonuses.push(bonuses);
        return this;
    }
    mine(...bonuses) {
        this.builder.spaceTypes.push(SpaceType_1.SpaceType.LUNAR_MINE);
        this.builder.bonuses.push(bonuses);
        return this;
    }
}
