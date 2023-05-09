"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaArchives = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
class LunaArchives extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_ARCHIVES,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MOON],
            cost: 13,
            resourceType: CardResource_1.CardResource.SCIENCE,
            action: {
                addResources: { tag: Tag_1.Tag.MOON },
            },
            metadata: {
                cardNumber: 'M69',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 science resource here for each Moon tag you have.', (ab) => ab.empty().startAction.science().slash().moon());
                    b.br;
                    b.effect('When playing a Moon tag, science resources here may be used as payment, and are worth 1M€ each.', (eb) => eb.moon(1, { played: Options_1.played }).startEffect.science().equals().megacredits(1));
                }),
            },
        });
    }
}
exports.LunaArchives = LunaArchives;
