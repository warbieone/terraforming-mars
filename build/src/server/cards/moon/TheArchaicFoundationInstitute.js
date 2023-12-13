"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheArchaicFoundationInstitute = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const LogHelper_1 = require("../../LogHelper");
class TheArchaicFoundationInstitute extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.THE_ARCHAIC_FOUNDATION_INSTITUTE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.MOON],
            startingMegaCredits: 55,
            resourceType: CardResource_1.CardResource.RESOURCE_CUBE,
            behavior: {
                addResources: 2,
            },
            metadata: {
                description: 'You start with 55 M€.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(55).nbsp;
                    b.effect('When you play a Moon tag, including these, add a cube to this card.', (eb) => {
                        eb.moon().startEffect.resourceCube();
                    }).br;
                    b.effect('Automatically remove 3 cubes here and gain 1 TR.', (eb) => {
                        eb.resourceCube(3, { digit: Options_1.digit }).startEffect.tr(1, { size: Size_1.Size.TINY });
                    }).br;
                    b.action('Remove 3 cubes here; gain 1 TR.', (ab) => {
                        ab.resourceCube(3, { digit: Options_1.digit }).startAction.tr(1, { size: Size_1.Size.TINY });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name)) {
            const moonTags = card.tags.filter((t) => t === Tag_1.Tag.MOON);
            const count = moonTags.length;
            if (count > 0) {
                player.addResourceTo(this, { qty: count, log: true });
            }
        }
    }
    canAct(player) {
        return (this.resourceCount >= 3 && player.canAfford({ cost: 0, tr: { tr: 1 } }));
    }
    action(player) {
        let tr = Math.floor(this.resourceCount / 3);
        while (!player.canAfford({ cost: 0, tr: { tr: tr } })) {
            tr--;
        }
        player.removeResourceFrom(this, tr * 3);
        player.increaseTerraformRating(tr);
        LogHelper_1.LogHelper.logRemoveResource(player, this, tr * 3, `Gain ${tr} TR`);
    }
    onResourceAdded(player, playedCard) {
        if (playedCard.name !== this.name)
            return;
        if (this.canAct(player)) {
            this.action(player);
        }
    }
}
exports.TheArchaicFoundationInstitute = TheArchaicFoundationInstitute;
//# sourceMappingURL=TheArchaicFoundationInstitute.js.map