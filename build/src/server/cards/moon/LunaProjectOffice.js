"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaProjectOffice = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../CardRequirements");
const Size_1 = require("../../../common/cards/render/Size");
class LunaProjectOffice extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_PROJECT_OFFICE,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 4,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                description: 'Requires 2 science tags.',
                cardNumber: 'M20',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('DRAW 5 CARDS DURING THE RESEARCH PHASE FOR THE NEXT 2 GENERATIONS.', Size_1.Size.MEDIUM, true);
                }),
            },
        });
    }
    bespokePlay(player) {
        MoonExpansion_1.MoonExpansion.moonData(player.game).lunaProjectOfficeLastGeneration = player.game.generation + 2;
        return undefined;
    }
    static isActive(player) {
        return MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => {
            var _a;
            if (!player.cardIsInEffect(CardName_1.CardName.LUNA_PROJECT_OFFICE)) {
                return false;
            }
            return player.game.generation <= ((_a = moonData.lunaProjectOfficeLastGeneration) !== null && _a !== void 0 ? _a : -1);
        }, () => false);
    }
}
exports.LunaProjectOffice = LunaProjectOffice;
