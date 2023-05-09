"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cyanobacteria = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCards_1 = require("../../deferredActions/AddResourcesToCards");
class Cyanobacteria extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CYANOBACTERIA,
            cost: 12,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.MARS],
            behavior: {
                global: { oxygen: 1 },
            },
            metadata: {
                cardNumber: 'Pf27',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oxygen(1).br;
                    b.microbes(1).asterix().slash().oceans(1).br;
                }),
                description: 'Raise the oxygen level 1%. For every ocean tile, add a microbe to ANY card.',
            },
        });
    }
    bespokePlay(player) {
        const microbes = player.game.board.getOceanSpaces({ upgradedOceans: true, wetlands: true }).length;
        player.game.defer(new AddResourcesToCards_1.AddResourcesToCards(player, CardResource_1.CardResource.MICROBE, microbes));
        return undefined;
    }
}
exports.Cyanobacteria = Cyanobacteria;
