"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeneraBase = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const SpaceName_1 = require("../../SpaceName");
const ActionCard_1 = require("../ActionCard");
class VeneraBase extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.VENERA_BASE,
            cost: 21,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.VENUS, Tag_1.Tag.CITY],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.UNITY)),
            victoryPoints: { tag: Tag_1.Tag.VENUS, per: 2 },
            behavior: {
                production: { megacredits: 3 },
                city: { space: SpaceName_1.SpaceName.VENERA_BASE },
            },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, tag: Tag_1.Tag.VENUS, count: 1, mustHaveCard: true },
            },
            metadata: {
                cardNumber: 'Pf67',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to ANY Venus card', (ab) => ab.empty().startAction.floaters(1, { secondaryTag: Tag_1.Tag.VENUS }).asterix());
                    b.br;
                    b.production((pb) => pb.megacredits(3)).nbsp.city({ secondaryTag: Tag_1.Tag.SPACE }).asterix();
                    b.br;
                    b.vpText('1 VP per 2 Venus tags you have.');
                }),
                description: 'Requires Unity is ruling or that you have 2 delegates there. Raise your M€ production 3 steps and place a city tile ON THE RESERVED AREA.',
            },
        });
    }
}
exports.VeneraBase = VeneraBase;
//# sourceMappingURL=VeneraBase.js.map