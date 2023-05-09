"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianMediaCenter = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class MartianMediaCenter extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MARTIAN_MEDIA_CENTER,
            tags: [Tag_1.Tag.BUILDING],
            cost: 7,
            behavior: {
                production: { megacredits: 2 },
            },
            action: {
                spend: { megacredits: 3 },
                turmoil: { sendDelegates: { count: 1 } },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.MARS)),
            metadata: {
                cardNumber: 'T07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Pay 3 M€ to add a delegate to any party.', (eb) => {
                        eb.megacredits(3).startAction.delegates(1);
                    }).br;
                    b.production((pb) => {
                        pb.megacredits(2);
                    });
                }),
                description: 'Requires that Mars First is ruling or that you have 2 delegates there. Increase your M€ production 2 steps.',
            },
        });
    }
}
exports.MartianMediaCenter = MartianMediaCenter;
