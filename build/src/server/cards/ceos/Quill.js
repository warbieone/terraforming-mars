"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quill = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Resource_1 = require("../../../common/Resource");
const GainResources_1 = require("../../deferredActions/GainResources");
class Quill extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.QUILL,
            metadata: {
                cardNumber: 'L17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY').br;
                    b.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.FLOATER }).colon().floaters(2).megacredits(1).asterix();
                }),
                description: 'Once per game, add 2 floaters to each of your cards that collect floaters, then add 2 floaters to ANY card. Gain 1 M€ for every 2 floaters added this way.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.getResourceCards(CardResource_1.CardResource.FLOATER).length > 0;
    }
    action(player) {
        this.isDisabled = true;
        const resourceCards = player.getResourceCards(CardResource_1.CardResource.FLOATER);
        resourceCards.forEach((card) => player.addResourceTo(card, { qty: 2, log: true }));
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { count: 2 }));
        player.game.defer(new GainResources_1.GainResources(player, Resource_1.Resource.MEGACREDITS, { count: resourceCards.length + 1, log: true }));
        return undefined;
    }
}
exports.Quill = Quill;
