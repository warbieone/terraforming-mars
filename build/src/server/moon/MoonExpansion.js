"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonExpansion = void 0;
const MoonBoard_1 = require("./MoonBoard");
const TileType_1 = require("../../common/TileType");
const SpaceType_1 = require("../../common/boards/SpaceType");
const CardName_1 = require("../../common/cards/CardName");
const Units_1 = require("../../common/Units");
const Tag_1 = require("../../common/cards/Tag");
const constants_1 = require("../../common/constants");
const Resource_1 = require("../../common/Resource");
const Phase_1 = require("../../common/Phase");
const BoardType_1 = require("../boards/BoardType");
class MoonExpansion {
    constructor() {
    }
    static ifMoon(game, cb) {
        if (game.gameOptions.moonExpansion) {
            if (game.moonData === undefined) {
                console.log(`Assertion failure: game.moonData is undefined for ${game.id}`);
            }
            else {
                return cb(game.moonData);
            }
        }
        return undefined;
    }
    static ifElseMoon(game, cb, elseCb) {
        if (game.gameOptions.moonExpansion) {
            if (game.moonData === undefined) {
                console.log(`Assertion failure: game.moonData is undefined for ${game.id}`);
            }
            else {
                return cb(game.moonData);
            }
        }
        return elseCb();
    }
    static moonData(game) {
        if (game.gameOptions.moonExpansion === true && game.moonData !== undefined) {
            return game.moonData;
        }
        throw new Error('Assertion error: Using a Moon feature when the Moon expansion is undefined.');
    }
    static initialize() {
        return {
            moon: MoonBoard_1.MoonBoard.newInstance(),
            colonyRate: 0,
            miningRate: 0,
            logisticRate: 0,
            lunaFirstPlayer: undefined,
            lunaProjectOfficeLastGeneration: undefined,
        };
    }
    static addMineTile(player, spaceId, cardName = undefined) {
        MoonExpansion.addTile(player, spaceId, { tileType: TileType_1.TileType.MOON_MINE, card: cardName });
    }
    static addHabitatTile(player, spaceId, cardName = undefined) {
        MoonExpansion.addTile(player, spaceId, { tileType: TileType_1.TileType.MOON_HABITAT, card: cardName });
    }
    static addRoadTile(player, spaceId, cardName = undefined) {
        MoonExpansion.addTile(player, spaceId, { tileType: TileType_1.TileType.MOON_ROAD, card: cardName });
    }
    static addTile(player, spaceId, tile) {
        const game = player.game;
        MoonExpansion.ifMoon(game, (moonData) => {
            const space = moonData.moon.getSpace(spaceId);
            if (!this.MOON_TILES.has(tile.tileType)) {
                throw new Error(`Bad tile type for the moon: ${tile.tileType}`);
            }
            if (space.tile !== undefined) {
                throw new Error('Selected space is occupied');
            }
            if (space.player !== undefined && space.player !== player) {
                throw new Error('This space is land claimed by ' + space.player.name);
            }
            space.tile = tile;
            if (player.game.phase !== Phase_1.Phase.SOLAR) {
                space.player = player;
            }
            if (game.phase !== Phase_1.Phase.SOLAR) {
                space.bonus.forEach((spaceBonus) => {
                    game.grantSpaceBonus(player, spaceBonus);
                });
            }
            MoonExpansion.logTilePlacement(player, space, tile.tileType);
            game.getPlayers().forEach((p) => {
                p.tableau.forEach((playedCard) => {
                    var _a;
                    (_a = playedCard.onTilePlaced) === null || _a === void 0 ? void 0 : _a.call(playedCard, p, player, space, BoardType_1.BoardType.MOON);
                });
            });
        });
    }
    static logTilePlacement(player, space, tileType) {
        if (space.x !== -1 && space.y !== -1) {
            const offsets = [-1, 0, 1, 1, 1, 0, -1];
            const row = space.y + 1;
            const position = space.x + offsets[space.y];
            player.game.log('${0} placed a ${1} tile on The Moon at (${2}, ${3})', (b) => b.player(player).string(TileType_1.TileType.toString(tileType)).number(row).number(position));
        }
    }
    static bonus(originalRate, increment, value, cb) {
        if (originalRate < value && originalRate + increment >= value) {
            cb();
        }
    }
    static raiseMiningRate(player, count = 1) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const available = constants_1.MAXIMUM_MINING_RATE - moonData.miningRate;
            const increment = Math.min(count, available);
            if (increment > 0) {
                if (player.game.phase === Phase_1.Phase.SOLAR) {
                    player.game.log('${0} acted as World Government and raised the mining rate ${1} step(s)', (b) => b.player(player).number(increment));
                    this.activateLunaFirst(undefined, player.game, increment);
                }
                else {
                    player.game.log('${0} raised the mining rate ${1} step(s)', (b) => b.player(player).number(increment));
                    player.increaseTerraformRatingSteps(increment);
                    this.bonus(moonData.miningRate, increment, 3, () => {
                        player.drawCard();
                    });
                    this.bonus(moonData.miningRate, increment, 6, () => {
                        player.production.add(Resource_1.Resource.TITANIUM, 1, { log: true });
                    });
                    this.activateLunaFirst(player, player.game, increment);
                }
                moonData.miningRate += increment;
            }
        });
    }
    static raiseHabitatRate(player, count = 1) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const available = constants_1.MAXIMUM_HABITAT_RATE - moonData.colonyRate;
            const increment = Math.min(count, available);
            if (increment > 0) {
                if (player.game.phase === Phase_1.Phase.SOLAR) {
                    player.game.log('${0} acted as World Government and raised the habitat rate ${1} step(s)', (b) => b.player(player).number(increment));
                    this.activateLunaFirst(undefined, player.game, count);
                }
                else {
                    player.game.log('${0} raised the habitat rate ${1} step(s)', (b) => b.player(player).number(increment));
                    player.increaseTerraformRatingSteps(count);
                    this.bonus(moonData.colonyRate, increment, 3, () => {
                        player.drawCard();
                    });
                    this.bonus(moonData.colonyRate, increment, 6, () => {
                        player.production.add(Resource_1.Resource.ENERGY, 1, { log: true });
                    });
                    this.activateLunaFirst(player, player.game, count);
                }
                moonData.colonyRate += increment;
            }
        });
    }
    static raiseLogisticRate(player, count = 1) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const available = constants_1.MAXIMUM_LOGISTICS_RATE - moonData.logisticRate;
            const increment = Math.min(count, available);
            if (increment > 0) {
                if (player.game.phase === Phase_1.Phase.SOLAR) {
                    player.game.log('${0} acted as World Government and raised the logistic rate ${1} step(s)', (b) => b.player(player).number(increment));
                    this.activateLunaFirst(undefined, player.game, increment);
                }
                else {
                    player.game.log('${0} raised the logistic rate ${1} step(s)', (b) => b.player(player).number(increment));
                    player.increaseTerraformRatingSteps(count);
                    this.bonus(moonData.logisticRate, increment, 3, () => {
                        player.drawCard();
                    });
                    this.bonus(moonData.logisticRate, increment, 6, () => {
                        player.production.add(Resource_1.Resource.STEEL, 1, { log: true });
                    });
                    this.activateLunaFirst(player, player.game, increment);
                }
                moonData.logisticRate += increment;
            }
        });
    }
    static activateLunaFirst(sourcePlayer, game, count) {
        const lunaFirstPlayer = MoonExpansion.moonData(game).lunaFirstPlayer;
        if (lunaFirstPlayer !== undefined) {
            lunaFirstPlayer.addResource(Resource_1.Resource.MEGACREDITS, count, { log: true });
            if (lunaFirstPlayer.id === (sourcePlayer === null || sourcePlayer === void 0 ? void 0 : sourcePlayer.id)) {
                lunaFirstPlayer.production.add(Resource_1.Resource.MEGACREDITS, count, { log: true });
            }
        }
    }
    static lowerMiningRate(player, count) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const increment = Math.min(moonData.miningRate, count);
            moonData.miningRate -= increment;
            player.game.log('${0} lowered the mining rate ${1} step(s)', (b) => b.player(player).number(increment));
        });
    }
    static lowerHabitatRate(player, count) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const increment = Math.min(moonData.colonyRate, count);
            moonData.colonyRate -= increment;
            player.game.log('${0} lowered the habitat rate ${1} step(s)', (b) => b.player(player).number(increment));
        });
    }
    static lowerLogisticRate(player, count) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const increment = Math.min(moonData.logisticRate, count);
            moonData.logisticRate -= increment;
            player.game.log('${0} lowered the logistic rate ${1} step(s)', (b) => b.player(player).number(increment));
        });
    }
    static spaceHasType(space, type, upgradedTiles = true) {
        if (space.tile === undefined) {
            return false;
        }
        if (space.tile.tileType === type) {
            return true;
        }
        if (upgradedTiles && space.tile.tileType === TileType_1.TileType.LUNAR_MINE_URBANIZATION) {
            return type === TileType_1.TileType.MOON_HABITAT || type === TileType_1.TileType.MOON_MINE;
        }
        return false;
    }
    static spaces(game, tileType, options) {
        return MoonExpansion.ifElseMoon(game, (moonData) => {
            return moonData.moon.spaces.filter((space) => {
                if (space.tile === undefined) {
                    return false;
                }
                let include = true;
                if (tileType) {
                    include = MoonExpansion.spaceHasType(space, tileType, options === null || options === void 0 ? void 0 : options.upgradedTiles);
                }
                if (include && (options === null || options === void 0 ? void 0 : options.surfaceOnly)) {
                    include = space.spaceType !== SpaceType_1.SpaceType.COLONY;
                }
                if (include && (options === null || options === void 0 ? void 0 : options.ownedBy) !== undefined) {
                    include = space.player === options.ownedBy;
                }
                return include;
            });
        }, () => []);
    }
    static adjustedReserveCosts(player, card) {
        if (player.cardIsInEffect(CardName_1.CardName.LTF_PRIVILEGES) && card.tags.includes(Tag_1.Tag.MOON)) {
            return Units_1.Units.EMPTY;
        }
        const reserveUnits = card.reserveUnits || Units_1.Units.EMPTY;
        const heat = reserveUnits.heat || 0;
        let steel = reserveUnits.steel || 0;
        let titanium = reserveUnits.titanium || 0;
        const tilesBuilt = card.tilesBuilt || [];
        if (tilesBuilt.includes(TileType_1.TileType.MOON_HABITAT) && player.cardIsInEffect(CardName_1.CardName.SUBTERRANEAN_HABITATS)) {
            titanium -= 1;
        }
        if (tilesBuilt.includes(TileType_1.TileType.MOON_MINE) && player.cardIsInEffect(CardName_1.CardName.IMPROVED_MOON_CONCRETE)) {
            titanium -= 1;
        }
        if (tilesBuilt.includes(TileType_1.TileType.MOON_ROAD) && player.cardIsInEffect(CardName_1.CardName.LUNAR_DUST_PROCESSING_PLANT)) {
            steel = 0;
        }
        steel = Math.max(steel, 0);
        titanium = Math.max(titanium, 0);
        return Units_1.Units.of({ steel, titanium, heat });
    }
    static calculateVictoryPoints(player, vpb) {
        MoonExpansion.ifMoon(player.game, (moonData) => {
            const moon = moonData.moon;
            const mySpaces = moon.spaces.filter((space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id; });
            mySpaces.forEach((space) => {
                if (space.tile !== undefined) {
                    const type = space.tile.tileType;
                    switch (type) {
                        case TileType_1.TileType.MOON_ROAD:
                            vpb.setVictoryPoints('moon road', 1);
                            break;
                        case TileType_1.TileType.MOON_MINE:
                        case TileType_1.TileType.MOON_HABITAT:
                        case TileType_1.TileType.LUNAR_MINE_URBANIZATION:
                            const points = moon.getAdjacentSpaces(space).filter((adj) => MoonExpansion.spaceHasType(adj, TileType_1.TileType.MOON_ROAD)).length;
                            if (type === TileType_1.TileType.MOON_MINE || type === TileType_1.TileType.LUNAR_MINE_URBANIZATION) {
                                vpb.setVictoryPoints('moon mine', points);
                            }
                            if (type === TileType_1.TileType.MOON_HABITAT || type === TileType_1.TileType.LUNAR_MINE_URBANIZATION) {
                                vpb.setVictoryPoints('moon habitat', points);
                            }
                            break;
                    }
                }
            });
        });
    }
}
exports.MoonExpansion = MoonExpansion;
MoonExpansion.MOON_TILES = new Set([
    TileType_1.TileType.MOON_MINE,
    TileType_1.TileType.MOON_HABITAT,
    TileType_1.TileType.MOON_ROAD,
    TileType_1.TileType.LUNA_TRADE_STATION,
    TileType_1.TileType.LUNA_MINING_HUB,
    TileType_1.TileType.LUNA_TRAIN_STATION,
    TileType_1.TileType.LUNAR_MINE_URBANIZATION,
]);
