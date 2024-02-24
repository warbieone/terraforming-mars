"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const Units_1 = require("../../common/Units");
const TileType_1 = require("../../common/TileType");
const utils_1 = require("../../common/utils/utils");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const CardResource_1 = require("../../common/CardResource");
const utils = require("../../common/utils/utils");
class Counter {
    constructor(player, card) {
        this.player = player;
        this.card = card;
        this.cardIsUnplayed = !player.cardIsInEffect(card.name);
    }
    count(countable, context = 'default') {
        if (typeof (countable) === 'number') {
            return countable;
        }
        let sum = countable.start ?? 0;
        const player = this.player;
        const card = this.card;
        const game = player.game;
        if (countable.cities !== undefined) {
            const p = (countable.all === false) ? player : undefined;
            switch (countable.cities.where) {
                case 'offmars':
                    sum = game.board.getCitiesOffMars(p).length;
                    break;
                case 'onmars':
                    sum += game.board.getCitiesOnMars(p).length;
                    break;
                case 'everywhere':
                default:
                    sum += game.board.getCities(p).length;
            }
        }
        if (countable.oceans !== undefined) {
            sum += game.board.getOceanSpaces({ upgradedOceans: true, wetlands: true }).length;
        }
        if (countable.floaters !== undefined) {
            sum += player.getResourceCount(CardResource_1.CardResource.FLOATER);
        }
        if (countable.greeneries !== undefined) {
            const p = (countable.all === false) ? player : undefined;
            sum += game.board.getGreeneries(p).length;
        }
        if (countable.tag !== undefined) {
            const tag = countable.tag;
            if (Array.isArray(tag)) {
                if (this.cardIsUnplayed && (0, utils_1.hasIntersection)(tag, card.tags)) {
                    throw new Error(`Not supporting the case counting tags ${tag} when played card tags are ${card.tags}`);
                }
                if (countable.others === true) {
                    throw new Error('Not counting others\' multiple Tags.');
                }
                sum += player.tags.multipleCount(tag);
            }
            else {
                if (countable.others !== true) {
                    sum += player.tags.count(tag, context === 'vps' ? 'raw' : context);
                    if (this.cardIsUnplayed) {
                        sum += card.tags.filter((t) => t === tag).length;
                    }
                }
                if (countable.all === true || countable.others === true) {
                    player.getOpponents()
                        .forEach((p) => sum += p.tags.count(tag, 'raw'));
                }
            }
        }
        if (countable.resourcesHere !== undefined) {
            sum += card.resourceCount;
        }
        if (countable.colonies !== undefined) {
            player.game.colonies.forEach((colony) => {
                if (countable.all) {
                    sum += colony.colonies.length;
                }
                else {
                    sum += colony.colonies.filter((colony) => colony === player.id).length;
                }
            });
        }
        if (countable.moon !== undefined) {
            const moon = countable.moon;
            MoonExpansion_1.MoonExpansion.ifMoon(game, (moonData) => {
                if (moon.habitatRate) {
                    sum += moonData.habitatRate;
                }
                if (moon.miningRate) {
                    sum += moonData.miningRate;
                }
                if (moon.logisticRate) {
                    sum += moonData.logisticRate;
                }
            });
            if (moon.habitat) {
                sum += MoonExpansion_1.MoonExpansion.spaces(game, TileType_1.TileType.MOON_HABITAT, { surfaceOnly: true }).length;
            }
            if (moon.mine) {
                sum += MoonExpansion_1.MoonExpansion.spaces(game, TileType_1.TileType.MOON_MINE, { surfaceOnly: true }).length;
            }
            if (moon.road) {
                sum += MoonExpansion_1.MoonExpansion.spaces(game, TileType_1.TileType.MOON_ROAD, { surfaceOnly: true }).length;
            }
        }
        if (countable.underworld !== undefined) {
            const underworld = countable.underworld;
            if (underworld.corruption !== undefined) {
                if (countable.all === true) {
                    sum += utils.sum(game.getPlayers().map((p) => p.underworldData.corruption));
                }
                else {
                    sum += player.underworldData.corruption;
                }
            }
            if (underworld.excavationMarkers !== undefined) {
                if (countable.all) {
                    sum += player.game.board.spaces.filter((space) => space.excavator !== undefined).length;
                }
                else {
                    sum += player.game.board.spaces.filter((space) => space.excavator === player).length;
                }
            }
        }
        if (countable.each !== undefined) {
            sum = sum * countable.each;
        }
        if (countable.per !== undefined) {
            sum = Math.floor(sum / countable.per);
        }
        return sum;
    }
    countUnits(countableUnits) {
        const units = { ...Units_1.Units.EMPTY };
        for (const key of Object.keys(units)) {
            const safeKey = key;
            const countable = countableUnits[safeKey] ?? 0;
            units[safeKey] = this.count(countable);
        }
        return units;
    }
}
exports.Counter = Counter;
