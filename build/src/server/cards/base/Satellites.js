"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Satellites = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Satellites extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SATELLITES,
            tags: [Tag_1.Tag.SPACE],
            cost: 10,
            metadata: {
                cardNumber: '175',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash().space({ played: Options_1.played });
                    });
                }),
                description: 'Increase your M€ production 1 step for each space tag you have, including this one.',
            },
        });
    }
    bespokePlay(player) {
        player.production.add(Resource_1.Resource.MEGACREDITS, 1 + player.tags.count(Tag_1.Tag.SPACE), { log: true });
        return undefined;
    }
}
exports.Satellites = Satellites;
