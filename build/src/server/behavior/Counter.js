"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const Units_1 = require("../../common/Units");
const TileType_1 = require("../../common/TileType");
const utils_1 = require("../../common/utils/utils");
const MoonExpansion_1 = require("../moon/MoonExpansion");
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
        let sum = 0;
        const player = this.player;
        const card = this.card;
        const game = player.game;
        if (countable.cities !== undefined) {
            const p = (countable.all === false) ? player : undefined;
            switch (countable.cities.where) {
                case 'offmars':
                    sum = game.getCitiesOffMarsCount(p);
                    break;
                case 'onmars':
                    sum += game.getCitiesOnMarsCount(p);
                    break;
                case 'everywhere':
                default:
                    sum += game.getCitiesCount(p);
            }
        }
        if (countable.oceans !== undefined) {
            sum += game.board.getOceanCount({ wetlands: true });
        }
        if (countable.greeneries !== undefined) {
            const p = (countable.all === false) ? player : undefined;
            sum += game.getGreeneriesCount(p);
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
                    game.getPlayers()
                        .filter((p) => p.id !== player.id)
                        .forEach((p) => sum += p.tags.count(tag, 'raw'));
                }
            }
        }
        if (countable.resourcesHere !== undefined) {
            sum += card.resourceCount;
        }
        if (countable.moon !== undefined) {
            const moon = countable.moon;
            MoonExpansion_1.MoonExpansion.ifMoon(game, (moonData) => {
                if (moon.habitatRate) {
                    sum += moonData.colonyRate;
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
        if (countable.each !== undefined) {
            sum = sum * countable.each;
        }
        if (countable.per !== undefined) {
            sum = Math.floor(sum / countable.per);
        }
        return sum;
    }
    countUnits(countableUnits) {
        var _a;
        const units = Object.assign({}, Units_1.Units.EMPTY);
        for (const key of Object.keys(units)) {
            const safeKey = key;
            const countable = (_a = countableUnits[safeKey]) !== null && _a !== void 0 ? _a : 0;
            units[safeKey] = this.count(countable);
        }
        return units;
    }
}
exports.Counter = Counter;
