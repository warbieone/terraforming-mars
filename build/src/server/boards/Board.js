"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpecialTile = exports.playerTileFn = exports.nextToNoOtherTileFn = exports.Board = void 0;
const SpaceType_1 = require("../../common/boards/SpaceType");
const TileType_1 = require("../../common/TileType");
const AresHandler_1 = require("../ares/AresHandler");
const CardName_1 = require("../../common/cards/CardName");
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
class Board {
    constructor(spaces) {
        this.spaces = spaces;
        this.maxX = 0;
        this.maxY = 0;
        this.map = new Map();
        this.adjacentSpaces = new Map();
        this.maxX = Math.max(...spaces.map((s) => s.x));
        this.maxY = Math.max(...spaces.map((s) => s.y));
        spaces.forEach((space) => {
            this.adjacentSpaces.set(space.id, this.computeAdjacentSpaces(space));
            this.map.set(space.id, space);
        });
    }
    getVolcanicSpaceIds() {
        return [];
    }
    getNoctisCitySpaceId() {
        return undefined;
    }
    getSpace(id) {
        const space = this.map.get(id);
        if (space === undefined) {
            throw new Error(`Can't find space with id ${id}`);
        }
        return space;
    }
    computeAdjacentSpaces(space) {
        const middleRow = this.maxY / 2;
        if (space.spaceType !== SpaceType_1.SpaceType.COLONY) {
            if (space.y < 0 || space.y > this.maxY) {
                throw new Error('Unexpected space y value: ' + space.y);
            }
            if (space.x < 0 || space.x > this.maxX) {
                throw new Error('Unexpected space x value: ' + space.x);
            }
            const leftSpace = [space.x - 1, space.y];
            const rightSpace = [space.x + 1, space.y];
            const topLeftSpace = [space.x, space.y - 1];
            const topRightSpace = [space.x, space.y - 1];
            const bottomLeftSpace = [space.x, space.y + 1];
            const bottomRightSpace = [space.x, space.y + 1];
            if (space.y < middleRow) {
                bottomLeftSpace[0]--;
                topRightSpace[0]++;
            }
            else if (space.y === middleRow) {
                bottomRightSpace[0]++;
                topRightSpace[0]++;
            }
            else {
                bottomRightSpace[0]++;
                topLeftSpace[0]--;
            }
            const coords = [
                topLeftSpace,
                topRightSpace,
                rightSpace,
                bottomRightSpace,
                bottomLeftSpace,
                leftSpace,
            ];
            const spaces = [];
            for (const [x, y] of coords) {
                const adj = this.spaces.find((adj) => adj.x === x && adj.y === y &&
                    space !== adj && adj.spaceType !== SpaceType_1.SpaceType.COLONY);
                if (adj !== undefined) {
                    spaces.push(adj);
                }
            }
            return spaces;
        }
        return [];
    }
    getAdjacentSpaces(space) {
        const spaces = this.adjacentSpaces.get(space.id);
        if (spaces === undefined) {
            throw new Error(`Unexpected space ID ${space.id}`);
        }
        return spaces;
    }
    getSpaceByTileCard(cardName) {
        return this.spaces.find((space) => space.tile !== undefined && space.tile.card === cardName);
    }
    getOceanCount(include) {
        return this.getOceanSpaces(include).length;
    }
    getAvailableSpacesForType(player, type) {
        switch (type) {
            case 'land': return this.getAvailableSpacesOnLand(player);
            case 'ocean': return this.getAvailableSpacesForOcean(player);
            case 'greenery': return this.getAvailableSpacesForGreenery(player);
            case 'city': return this.getAvailableSpacesForCity(player);
            case 'isolated': return this.getAvailableIsolatedSpaces(player);
            case 'volcanic': return this.getAvailableVolcanicSpaces(player);
            case 'upgradeable-ocean': return this.getOceanSpaces({ upgradedOceans: false });
            default: throw new Error('unknown type ' + type);
        }
    }
    getOceanSpaces(include) {
        const spaces = this.spaces.filter((space) => {
            var _a, _b, _c;
            if (!Board.isOceanSpace(space))
                return false;
            if (((_a = space.tile) === null || _a === void 0 ? void 0 : _a.tileType) === undefined)
                return false;
            const tileType = space.tile.tileType;
            if (TileType_1.OCEAN_UPGRADE_TILES.has(tileType)) {
                return (_b = include === null || include === void 0 ? void 0 : include.upgradedOceans) !== null && _b !== void 0 ? _b : true;
            }
            if (tileType === TileType_1.TileType.WETLANDS) {
                return (_c = include === null || include === void 0 ? void 0 : include.wetlands) !== null && _c !== void 0 ? _c : false;
            }
            return true;
        });
        return spaces;
    }
    getSpaces(spaceType, _player) {
        return this.spaces.filter((space) => space.spaceType === spaceType);
    }
    getEmptySpaces() {
        return this.spaces.filter((space) => space.tile === undefined);
    }
    getAvailableSpacesForCity(player) {
        const spacesOnLand = this.getAvailableSpacesOnLand(player);
        if (player.cardIsInEffect(CardName_1.CardName.GORDON))
            return spacesOnLand;
        return spacesOnLand.filter((space) => this.getAdjacentSpaces(space).some((adjacentSpace) => Board.isCitySpace(adjacentSpace)) === false);
    }
    getAvailableSpacesForGreenery(player) {
        let spacesOnLand = this.getAvailableSpacesOnLand(player);
        if (player.cardIsInEffect(CardName_1.CardName.GORDON))
            return spacesOnLand;
        if (player.game.gameOptions.pathfindersExpansion === true) {
            spacesOnLand = spacesOnLand.filter((space) => {
                return !this.getAdjacentSpaces(space).some((neighbor) => { var _a; return ((_a = neighbor.tile) === null || _a === void 0 ? void 0 : _a.tileType) === TileType_1.TileType.RED_CITY; });
            });
        }
        const spacesForGreenery = spacesOnLand
            .filter((space) => this.getAdjacentSpaces(space).find((adj) => adj.tile !== undefined && adj.player === player && adj.tile.tileType !== TileType_1.TileType.OCEAN) !== undefined);
        if (spacesForGreenery.length > 0) {
            return spacesForGreenery;
        }
        return spacesOnLand;
    }
    getAvailableSpacesForOcean(player) {
        return this.getSpaces(SpaceType_1.SpaceType.OCEAN, player)
            .filter((space) => space.tile === undefined &&
            (space.player === undefined || space.player === player));
    }
    getAvailableSpacesOnLand(player) {
        const landSpaces = this.getSpaces(SpaceType_1.SpaceType.LAND, player).filter((space) => {
            var _a;
            const hasPlayerMarker = space.player !== undefined;
            const safeForPlayer = !hasPlayerMarker || space.player === player;
            const playableSpace = space.tile === undefined || AresHandler_1.AresHandler.hasHazardTile(space);
            const blockedByDesperateMeasures = ((_a = space.tile) === null || _a === void 0 ? void 0 : _a.protectedHazard) === true;
            const isRestricted = space.bonus.includes(SpaceBonus_1.SpaceBonus.RESTRICTED);
            return !isRestricted && safeForPlayer && playableSpace && !blockedByDesperateMeasures;
        });
        return landSpaces;
    }
    getAvailableIsolatedSpaces(player) {
        return this.getAvailableSpacesOnLand(player)
            .filter(nextToNoOtherTileFn(this));
    }
    getAvailableVolcanicSpaces(player) {
        const volcanicSpaceIds = this.getVolcanicSpaceIds();
        const spaces = this.getAvailableSpacesOnLand(player);
        if (volcanicSpaceIds.length > 0) {
            return spaces.filter((space) => volcanicSpaceIds.includes(space.id));
        }
        return spaces;
    }
    getNonReservedLandSpaces() {
        return this.spaces.filter((space) => {
            return (space.spaceType === SpaceType_1.SpaceType.LAND || space.spaceType === SpaceType_1.SpaceType.COVE) &&
                (space.tile === undefined || AresHandler_1.AresHandler.hasHazardTile(space)) &&
                space.player === undefined;
        });
    }
    getNthAvailableLandSpace(distance, direction, player = undefined, predicate = (_x) => true) {
        const spaces = this.spaces.filter((space) => {
            return this.canPlaceTile(space) && (space.player === undefined || space.player === player);
        }).filter(predicate);
        let idx = (direction === 1) ? distance : (spaces.length - (distance + 1));
        if (spaces.length === 0) {
            throw new Error('no spaces available');
        }
        while (idx < 0) {
            idx += spaces.length;
        }
        while (idx >= spaces.length) {
            idx -= spaces.length;
        }
        return spaces[idx];
    }
    canPlaceTile(space) {
        return space.tile === undefined && space.spaceType === SpaceType_1.SpaceType.LAND && space.bonus.includes(SpaceBonus_1.SpaceBonus.RESTRICTED) === false;
    }
    static isCitySpace(space) {
        return space.tile !== undefined && TileType_1.CITY_TILES.has(space.tile.tileType);
    }
    static isOceanSpace(space) {
        return space.tile !== undefined && TileType_1.OCEAN_TILES.has(space.tile.tileType);
    }
    static isUncoveredOceanSpace(space) {
        return space.tile !== undefined && TileType_1.BASE_OCEAN_TILES.has(space.tile.tileType);
    }
    static isGreenerySpace(space) {
        return space.tile !== undefined && TileType_1.GREENERY_TILES.has(space.tile.tileType);
    }
    static ownedBy(player) {
        return (space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id; };
    }
    static spaceOwnedBy(space, player) {
        return Board.ownedBy(player)(space);
    }
    serialize() {
        return {
            spaces: this.spaces.map((space) => {
                var _a;
                return {
                    id: space.id,
                    spaceType: space.spaceType,
                    tile: space.tile,
                    player: (_a = space.player) === null || _a === void 0 ? void 0 : _a.id,
                    bonus: space.bonus,
                    adjacency: space.adjacency,
                    x: space.x,
                    y: space.y,
                };
            }),
        };
    }
    static deserializeSpace(serialized, players) {
        const playerId = serialized.player;
        const player = players.find((p) => p.id === playerId);
        const space = {
            id: serialized.id,
            spaceType: serialized.spaceType,
            bonus: serialized.bonus,
            x: serialized.x,
            y: serialized.y,
        };
        if (serialized.tile !== undefined) {
            space.tile = serialized.tile;
        }
        if (player !== undefined) {
            space.player = player;
        }
        if (serialized.adjacency !== undefined) {
            space.adjacency = serialized.adjacency;
        }
        return space;
    }
    static deserializeSpaces(spaces, players) {
        return spaces.map((space) => Board.deserializeSpace(space, players));
    }
}
exports.Board = Board;
function nextToNoOtherTileFn(board) {
    return (space) => board.getAdjacentSpaces(space).every((space) => space.tile === undefined);
}
exports.nextToNoOtherTileFn = nextToNoOtherTileFn;
function playerTileFn(player) {
    return (space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id; };
}
exports.playerTileFn = playerTileFn;
function isSpecialTile(space) {
    var _a;
    switch ((_a = space.tile) === null || _a === void 0 ? void 0 : _a.tileType) {
        case TileType_1.TileType.GREENERY:
        case TileType_1.TileType.OCEAN:
        case TileType_1.TileType.CITY:
        case TileType_1.TileType.MOON_HABITAT:
        case TileType_1.TileType.MOON_MINE:
        case TileType_1.TileType.MOON_ROAD:
        case TileType_1.TileType.EROSION_MILD:
        case TileType_1.TileType.EROSION_SEVERE:
        case TileType_1.TileType.DUST_STORM_MILD:
        case TileType_1.TileType.DUST_STORM_SEVERE:
        case undefined:
            return false;
        default:
            return true;
    }
}
exports.isSpecialTile = isSpecialTile;
//# sourceMappingURL=Board.js.map