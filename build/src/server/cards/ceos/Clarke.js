"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clarke = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Resource_1 = require("../../../common/Resource");
class Clarke extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.CLARKE,
            metadata: {
                cardNumber: 'L03',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY').br;
                    b.production((pb) => pb.plants(1).heat(1));
                    b.text('X+4').plants(1).heat(1).asterix();
                }),
                description: 'Once per game, increase your plant and heat production 1 step each. Gain plants and heat equal to your production +4.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        player.production.add(Resource_1.Resource.PLANTS, 1, { log: true });
        player.production.add(Resource_1.Resource.HEAT, 1, { log: true });
        player.addResource(Resource_1.Resource.PLANTS, player.production.plants + 4, { log: true });
        player.addResource(Resource_1.Resource.HEAT, player.production.heat + 4, { log: true });
        return undefined;
    }
}
exports.Clarke = Clarke;
