"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpecialTileSpace = exports.isSpecialTile = exports.playerTileFn = exports.Board = void 0;
const SpaceType_1 = require("../../common/boards/SpaceType");
const TileType_1 = require("../../common/TileType");
const AresHandler_1 = require("../ares/AresHandler");
const Units_1 = require("../../common/Units");
const AresTileType_1 = require("../../common/AresTileType");
const utils_1 = require("../../common/utils/utils");
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
            const adjacentSpaces = this.computeAdjacentSpaces(space);
            const filtered = adjacentSpaces.filter((space) => space !== undefined);
            this.adjacentSpaces.set(space.id, filtered);
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
            const spaces = coords.map(([x, y]) => this.spaces.find((adj) => adj.x === x && adj.y === y &&
                space !== adj && adj.spaceType !== SpaceType_1.SpaceType.COLONY));
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
    getAdjacentSpacesClockwise(space) {
        return this.computeAdjacentSpaces(space);
    }
    getSpaceByTileCard(cardName) {
        return this.spaces.find((space) => space.tile !== undefined && space.tile.card === cardName);
    }
    getSpaces(spaceType, _player) {
        return this.spaces.filter((space) => space.spaceType === spaceType);
    }
    spaceCosts(_space) {
        return { stock: { ...Units_1.Units.EMPTY }, production: 0, tr: {} };
    }
    computeAdditionalCosts(space, aresExtension) {
        const costs = this.spaceCosts(space);
        if (aresExtension === false) {
            return costs;
        }
        switch ((0, AresTileType_1.hazardSeverity)(space.tile?.tileType)) {
            case AresTileType_1.HazardSeverity.MILD:
                costs.stock.megacredits += 8;
                break;
            case AresTileType_1.HazardSeverity.SEVERE:
                costs.stock.megacredits += 16;
                break;
        }
        for (const adjacentSpace of this.getAdjacentSpaces(space)) {
            switch ((0, AresTileType_1.hazardSeverity)(adjacentSpace.tile?.tileType)) {
                case AresTileType_1.HazardSeverity.MILD:
                    costs.production += 1;
                    break;
                case AresTileType_1.HazardSeverity.SEVERE:
                    costs.production += 2;
                    break;
            }
            if (adjacentSpace.adjacency !== undefined) {
                const adjacency = adjacentSpace.adjacency;
                costs.stock.megacredits += adjacency.cost ?? 0;
            }
        }
        return costs;
    }
    canAfford(player, space, canAffordOptions) {
        const additionalCosts = this.computeAdditionalCosts(space, player.game.gameOptions.aresExtension);
        if (additionalCosts.stock.megacredits > 0) {
            const plan = canAffordOptions !== undefined ? { ...canAffordOptions } : { cost: 0, tr: {} };
            plan.cost += additionalCosts.stock.megacredits;
            plan.tr = additionalCosts.tr;
            const afford = player.canAfford(plan);
            if (afford === false) {
                return false;
            }
        }
        if (additionalCosts.production > 0) {
            const availableProduction = (0, utils_1.sum)(Units_1.Units.values(player.production)) + 5;
            return availableProduction > additionalCosts.production;
        }
        return true;
    }
    getAvailableSpacesOnLand(player, canAffordOptions) {
        const landSpaces = this.getSpaces(SpaceType_1.SpaceType.LAND, player).filter((space) => {
            if (space.player !== undefined && space.player !== player) {
                return false;
            }
            const playableSpace = space.tile === undefined || (AresHandler_1.AresHandler.hasHazardTile(space) && space.tile?.protectedHazard !== true);
            if (!playableSpace) {
                return false;
            }
            if (space.id === player.game.nomadSpace) {
                return false;
            }
            return this.canAfford(player, space, canAffordOptions);
        });
        return landSpaces;
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
        return space.tile === undefined && space.spaceType === SpaceType_1.SpaceType.LAND;
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
        return (space) => space.player?.id === player.id;
    }
    static spaceOwnedBy(space, player) {
        return Board.ownedBy(player)(space);
    }
    serialize() {
        return {
            spaces: this.spaces.map((space) => {
                const serialized = {
                    id: space.id,
                    spaceType: space.spaceType,
                    tile: space.tile,
                    player: space.player?.id,
                    bonus: space.bonus,
                    adjacency: space.adjacency,
                    x: space.x,
                    y: space.y,
                };
                if (space.undergroundResources !== undefined) {
                    serialized.undergroundResources = space.undergroundResources;
                }
                if (space.excavator !== undefined) {
                    serialized.excavator = space.excavator.id;
                }
                return serialized;
            }),
        };
    }
    static deserializeSpace(serialized, players) {
        const playerId = serialized.player;
        const player = players.find((p) => p.id === playerId);
        const excavator = players.find((p) => p.id === serialized.excavator);
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
        if (serialized.undergroundResources !== undefined) {
            space.undergroundResources = serialized.undergroundResources;
        }
        if (excavator !== undefined) {
            space.excavator = excavator;
        }
        return space;
    }
    static deserializeSpaces(spaces, players) {
        return spaces.map((space) => Board.deserializeSpace(space, players));
    }
}
exports.Board = Board;
function playerTileFn(player) {
    return (space) => space.player?.id === player.id;
}
exports.playerTileFn = playerTileFn;
function isSpecialTile(tileType) {
    switch (tileType) {
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
function isSpecialTileSpace(space) {
    return isSpecialTile(space.tile?.tileType);
}
exports.isSpecialTileSpace = isSpecialTileSpace;
