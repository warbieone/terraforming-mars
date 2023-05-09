"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tate = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Tag_1 = require("../../../common/cards/Tag");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const Size_1 = require("../../../common/cards/render/Size");
const utils_1 = require("../../../common/utils/utils");
class Tate extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.TATE,
            metadata: {
                cardNumber: 'L20',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('5', Size_1.Size.LARGE).cards(1, { secondaryTag: Tag_1.Tag.WILD }).asterix();
                    b.br.br;
                }),
                description: 'Once per game, name a tag. Reveal cards from the deck until you find 5 cards with that tag. BUY up to 2 cards and discard the rest.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const tags = [...game.tags];
        (0, utils_1.inplaceRemove)(tags, Tag_1.Tag.WILD);
        (0, utils_1.inplaceRemove)(tags, Tag_1.Tag.EVENT);
        (0, utils_1.inplaceRemove)(tags, Tag_1.Tag.CLONE);
        const options = tags.map((tag) => {
            return new SelectOption_1.SelectOption('Search for ' + tag + ' tags', 'Search', () => {
                game.log('${0} searched for ${1} tags', (b) => b.player(player).string(tag));
                return player.drawCardKeepSome(5, { keepMax: 2, tag: tag, paying: true, logDrawnCard: true });
            });
        });
        return new OrOptions_1.OrOptions(...options);
    }
}
exports.Tate = Tate;
