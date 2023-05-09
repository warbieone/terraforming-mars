"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonBoard = void 0;
const Board_1 = require("../boards/Board");
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const SpaceType_1 = require("../../common/boards/SpaceType");
const MoonSpaces_1 = require("../../common/moon/MoonSpaces");
class Space {
    constructor(id, spaceType, x, y, bonus) {
        this.id = id;
        this.spaceType = spaceType;
        this.x = x;
        this.y = y;
        this.bonus = bonus;
    }
    static mine(id, x, y, bonus) {
        return new Space(id, SpaceType_1.SpaceType.LUNAR_MINE, x, y, bonus);
    }
    static surface(id, x, y, bonus) {
        return new Space(id, SpaceType_1.SpaceType.LAND, x, y, bonus);
    }
    static colony(id) {
        return new Space(id, SpaceType_1.SpaceType.COLONY, -1, -1, []);
    }
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
    static newInstance() {
        const STEEL = SpaceBonus_1.SpaceBonus.STEEL;
        const DRAW_CARD = SpaceBonus_1.SpaceBonus.DRAW_CARD;
        const TITANIUM = SpaceBonus_1.SpaceBonus.TITANIUM;
        const b = new Builder();
        b.colony();
        b.row(2).land().land(STEEL, DRAW_CARD).land().mine(TITANIUM);
        b.row(1).mine(TITANIUM, TITANIUM).mine().land(STEEL).land().land();
        b.row(0).mine().land(STEEL).land(STEEL, TITANIUM).mine().mine(TITANIUM).land(STEEL, STEEL);
        b.row(0).land(STEEL).land().land().mine(TITANIUM).mine(TITANIUM);
        b.row(0).land().mine(TITANIUM).mine().land().mine().land(STEEL);
        b.row(1).land().land(STEEL).land(STEEL).land(DRAW_CARD, DRAW_CARD).land(STEEL);
        b.row(2).land(DRAW_CARD, DRAW_CARD).mine(TITANIUM).mine(TITANIUM, TITANIUM).land();
        b.colony();
        return new MoonBoard(b.spaces);
    }
    static deserialize(board, players) {
        const spaces = Board_1.Board.deserializeSpaces(board.spaces, players);
        return new MoonBoard(spaces);
    }
}
exports.MoonBoard = MoonBoard;
class Builder {
    constructor() {
        this.y = -1;
        this.x = 0;
        this.spaces = [];
        this.idx = 0;
    }
    row(startX) {
        this.y++;
        this.x = startX;
        return new Row(this);
    }
    colony() {
        this.spaces.push(Space.colony(this.nextId()));
    }
    nextId() {
        this.idx++;
        const strId = this.idx.toString().padStart(2, '0');
        return 'm' + strId;
    }
}
class Row {
    constructor(builder) {
        this.builder = builder;
    }
    land(...bonuses) {
        const space = Space.surface(this.builder.nextId(), this.builder.x++, this.builder.y, bonuses);
        this.builder.spaces.push(space);
        return this;
    }
    mine(...bonuses) {
        const space = Space.mine(this.builder.nextId(), this.builder.x++, this.builder.y, bonuses);
        this.builder.spaces.push(space);
        return this;
    }
}
