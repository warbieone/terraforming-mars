"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicSponsoredGrant = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Options_1 = require("../Options");
class PublicSponsoredGrant extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.PUBLIC_SPONSORED_GRANT,
            cost: 6,
            requirements: { party: PartyName_1.PartyName.SCIENTISTS },
            metadata: {
                cardNumber: 'PfTVD',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().megacredits(2, { all: Options_1.all }).br;
                    b.cards(1, { secondaryTag: Tag_1.Tag.WILD }).cards(1, { secondaryTag: Tag_1.Tag.WILD }).asterix();
                }),
                description: 'Requires Scientists are ruling or that you have 2 delegates there. All players lose 2M€. Choose a tag (NOT CITY, ? OR PLANETARY TRACK) and draw 2 cards with that tag.',
            },
        });
    }
    draw2Cards(player, tag) {
        player.drawCard(2, { tag: tag });
    }
    bespokePlay(player) {
        player.game.getPlayers().forEach((p) => p.stock.deduct(Resource_1.Resource.MEGACREDITS, Math.min(p.megaCredits, 2), { log: true, from: player }));
        const tags = [
            Tag_1.Tag.BUILDING,
            Tag_1.Tag.SPACE,
            Tag_1.Tag.SCIENCE,
            Tag_1.Tag.POWER,
            Tag_1.Tag.PLANT,
            Tag_1.Tag.MICROBE,
            Tag_1.Tag.ANIMAL
        ];
        const options = tags.map((tag) => {
            return new SelectOption_1.SelectOption(tag).andThen(() => {
                this.draw2Cards(player, tag);
                return undefined;
            });
        });
        return new OrOptions_1.OrOptions(...options);
    }
}
exports.PublicSponsoredGrant = PublicSponsoredGrant;
//# sourceMappingURL=PublicSponsoredGrant.js.map