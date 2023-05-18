"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CulturalMetropolis = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const SendDelegateToArea_1 = require("../../deferredActions/SendDelegateToArea");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Turmoil_1 = require("../../turmoil/Turmoil");
class CulturalMetropolis extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CULTURAL_METROPOLIS,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 20,
            behavior: {
                production: { energy: -1, megacredits: 3 },
                city: {},
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.UNITY)),
            metadata: {
                cardNumber: 'T03',
                description: 'Requires that Unity is ruling or that you have 2 delegates there. Decrease your energy production 1 step and increase your M€ production 3 steps. Place a city tile. Place 2 delegates in 1 party.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                    }).city().delegates(2);
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        return turmoil.getAvailableDelegateCount(player.id) >= 2 && player.game.board.getAvailableSpacesForCity(player).length > 0;
    }
    bespokePlay(player) {
        player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, 'Select where to send two delegates', { count: 2 }));
        return undefined;
    }
}
exports.CulturalMetropolis = CulturalMetropolis;
//# sourceMappingURL=CulturalMetropolis.js.map