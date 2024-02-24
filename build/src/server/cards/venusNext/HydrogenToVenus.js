"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrogenToVenus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class HydrogenToVenus extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.HYDROGEN_TO_VENUS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE],
            cost: 11,
            behavior: {
                global: { venus: 1 },
                addResourcesToAnyCard: { count: { tag: Tag_1.Tag.JOVIAN }, type: CardResource_1.CardResource.FLOATER, tag: Tag_1.Tag.VENUS },
            },
            metadata: {
                cardNumber: '231',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).br.br;
                    b.floaters(1, { secondaryTag: Tag_1.Tag.VENUS }).slash().jovian({ played: Options_1.played });
                }),
                description: 'Raise Venus 1 step. Add 1 floater to A VENUS CARD for each Jovian tag you have.',
            },
        });
    }
}
exports.HydrogenToVenus = HydrogenToVenus;
