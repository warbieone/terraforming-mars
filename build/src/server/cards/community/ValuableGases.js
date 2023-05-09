"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuableGases = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectProjectCardToPlay_1 = require("../../inputs/SelectProjectCardToPlay");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class ValuableGases extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.VALUABLE_GASES,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.VENUS],
            behavior: {
                stock: { megacredits: 6 },
            },
            metadata: {
                cardNumber: 'Y06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(6).br.br;
                    b.text('play', Size_1.Size.MEDIUM, true).cards(1, { secondaryTag: Tag_1.Tag.VENUS }).colon();
                    b.floaters(4, { digit: Options_1.digit });
                }),
                description: 'Gain 6 M€. Play a Venus card from your hand and add 4 floaters to it.',
            },
        });
    }
    bespokePlay(player) {
        const playableCards = player.getPlayableCards().filter((card) => card.tags.includes(Tag_1.Tag.VENUS));
        if (playableCards.length > 0) {
            return new SelectProjectCardToPlay_1.SelectProjectCardToPlay(player, playableCards, {
                cb: (card) => {
                    if (card.resourceType === CardResource_1.CardResource.FLOATER) {
                        player.addResourceTo(card, 4);
                    }
                },
            });
        }
        return undefined;
    }
}
exports.ValuableGases = ValuableGases;
