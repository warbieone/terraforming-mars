"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologyExperts = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const PreludeCard_1 = require("./PreludeCard");
const PlayProjectCard_1 = require("../../deferredActions/PlayProjectCard");
const CardRenderer_1 = require("../render/CardRenderer");
class EcologyExperts extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.ECOLOGY_EXPERTS,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.MICROBE],
            behavior: {
                production: { plants: 1 },
            },
            metadata: {
                cardNumber: 'P10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).br.br;
                    b.projectRequirements();
                }),
                description: 'Increase your plant production 1 step. Play a card from hand, ignoring global requirements.',
            },
        });
    }
    getRequirementBonus(player) {
        if (player.lastCardPlayed === this.name) {
            return 50;
        }
        return 0;
    }
    bespokePlay(player) {
        player.game.defer(new PlayProjectCard_1.PlayProjectCard(player));
        return undefined;
    }
}
exports.EcologyExperts = EcologyExperts;
