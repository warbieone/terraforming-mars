"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdhaiHighOrbitConstructions = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const PathfindersData_1 = require("../../pathfinders/PathfindersData");
const Options_1 = require("../Options");
const Size_1 = require("../../../common/cards/render/Size");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class AdhaiHighOrbitConstructions extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 43,
            resourceType: CardResource_1.CardResource.ORBITAL,
            behavior: {
                addResources: 1,
            },
            metadata: {
                cardNumber: 'PfC23',
                description: 'You start with 43 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(43).nbsp.nbsp.space({ played: Options_1.played, secondaryTag: AltSecondaryTag_1.AltSecondaryTag.NO_PLANETARY_TAG }).colon().orbital().br;
                    b.text('(Effect: Whenever you play a card with a space tag BUT NO PLANETARY TAG (including this) add 1 orbital on this card.)', Size_1.Size.SMALL, false, false);
                    b.br;
                    b.effect('For every 2 orbitals on this card, cards with a space tag but with no planetary tag or the STANDARD COLONY PROJECT or TRADE ACTION costs 1M€ less.', (eb) => {
                        eb.space({ played: Options_1.played, secondaryTag: AltSecondaryTag_1.AltSecondaryTag.NO_PLANETARY_TAG }).slash(Size_1.Size.SMALL).colonies(1, { size: Size_1.Size.SMALL }).slash(Size_1.Size.SMALL).trade({ size: Size_1.Size.SMALL })
                            .startEffect
                            .minus().megacredits(1).text('/2').orbital();
                    });
                }),
            },
        });
    }
    matchingTags(tags) {
        let spaceTag = false;
        for (const tag of tags) {
            if (tag === Tag_1.Tag.SPACE)
                spaceTag = true;
            if ((0, PathfindersData_1.isPlanetaryTag)(tag))
                return false;
        }
        return spaceTag;
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(CardName_1.CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS) && this.matchingTags(card.tags)) {
            player.addResourceTo(this, 1);
        }
    }
    getCardDiscount(player, card) {
        if (player.isCorporation(CardName_1.CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS) && this.matchingTags(card.tags)) {
            return Math.floor(this.resourceCount / 2);
        }
        else {
            return 0;
        }
    }
}
exports.AdhaiHighOrbitConstructions = AdhaiHighOrbitConstructions;
