"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirRaid = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const RemoveResourcesFromCard_1 = require("../../deferredActions/RemoveResourcesFromCard");
const StealResources_1 = require("../../deferredActions/StealResources");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class AirRaid extends Card_1.Card {
    constructor() {
        super({
            cost: 0,
            name: CardName_1.CardName.AIR_RAID,
            type: CardType_1.CardType.EVENT,
            metadata: {
                cardNumber: 'C02',
                description: 'Requires that you lose 1 floater. Steal 5 M€ from any player.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().floaters(1);
                    b.text('steal', Size_1.Size.MEDIUM, true).megacredits(5, { all: Options_1.all });
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        return player.getResourceCount(CardResource_1.CardResource.FLOATER) > 0;
    }
    bespokePlay(player) {
        player.game.defer(new StealResources_1.StealResources(player, Resource_1.Resource.MEGACREDITS, 5));
        player.game.defer(new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, CardResource_1.CardResource.FLOATER, 1, true));
        return undefined;
    }
}
exports.AirRaid = AirRaid;
