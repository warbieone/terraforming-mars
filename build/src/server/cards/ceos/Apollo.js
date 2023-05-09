"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apollo = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class Apollo extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.APOLLO,
            metadata: {
                cardNumber: 'L35',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br.br;
                    b.moonHabitat({ all: Options_1.all }).moonMine({ all: Options_1.all }).moonRoad({ all: Options_1.all }).nbsp.colon().megacredits(3);
                    b.br.br;
                }),
                description: 'Once per game, gain 3 M€ for each tile on The Moon.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const moonSpacesCount = MoonExpansion_1.MoonExpansion.spaces(player.game, undefined, { surfaceOnly: true }).length;
        player.addResource(Resource_1.Resource.MEGACREDITS, moonSpacesCount * 3, { log: true });
        return undefined;
    }
}
exports.Apollo = Apollo;
