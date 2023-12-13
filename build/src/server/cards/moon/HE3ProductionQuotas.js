"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HE3ProductionQuotas = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class HE3ProductionQuotas extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.HE3_PRODUCTION_QUOTAS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON],
            cost: 10,
            behavior: {
                moon: { miningRate: 1 },
            },
            requirements: [{ party: PartyName_1.PartyName.KELVINISTS }, { miningTiles: 1, all: Options_1.all }],
            metadata: {
                description: 'Requires that Kelvinists are ruling or that you have 2 delegates there, and 1 mine tile on The Moon. ' +
                    'Pay 1 steel per mine tile on The Moon to gain 4 heat per mine tile on The Moon. Raise the mining rate 1 step.',
                cardNumber: 'M57',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().steel(1).slash().moonMine({ size: Size_1.Size.SMALL, all: Options_1.all })
                        .colon().text('4').heat(1).slash().moonMine({ size: Size_1.Size.SMALL, all: Options_1.all }).br;
                    b.moonMiningRate();
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        const moonTiles = MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_MINE, { surfaceOnly: true });
        if (player.steel < moonTiles.length) {
            return false;
        }
        return true;
    }
    bespokePlay(player) {
        const moonTiles = MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_MINE, { surfaceOnly: true });
        player.steel -= moonTiles.length;
        player.heat += (4 * moonTiles.length);
        return undefined;
    }
}
exports.HE3ProductionQuotas = HE3ProductionQuotas;
//# sourceMappingURL=HE3ProductionQuotas.js.map