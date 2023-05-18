"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PioneerSettlement = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const BuildColony_1 = require("../../deferredActions/BuildColony");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class PioneerSettlement extends Card_1.Card {
    constructor() {
        super({
            cost: 13,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.PIONEER_SETTLEMENT,
            type: CardType_1.CardType.AUTOMATED,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.colonies(1, { max: Options_1.max })),
            victoryPoints: 2,
            metadata: {
                cardNumber: 'C29',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(-2));
                    b.nbsp.colonies(1);
                }),
                description: 'Requires that you have no more than 1 colony. Decrease your M€ production 2 steps. Place a colony.',
            },
        });
    }
    bespokeCanPlay(player) {
        if (player.colonies.getPlayableColonies().length === 0) {
            return false;
        }
        let lunaIsAvailable = false;
        let coloniesCount = 0;
        const hasOneColonyMax = player.game.colonies.every((colony) => {
            if (colony.name === ColonyName_1.ColonyName.LUNA &&
                colony.isFull() === false &&
                colony.colonies.includes(player.id) === false) {
                lunaIsAvailable = true;
            }
            coloniesCount += colony.colonies.filter((owner) => owner === player.id).length;
            if (coloniesCount > 1) {
                return false;
            }
            return true;
        });
        if (hasOneColonyMax === false) {
            return false;
        }
        const megaCreditsProduction = player.production.megacredits;
        if (megaCreditsProduction === -4 && player.isCorporation(CardName_1.CardName.POSEIDON)) {
            return true;
        }
        else if (megaCreditsProduction <= -4) {
            if (lunaIsAvailable === false) {
                return false;
            }
            this.warning = 'You will only be able to build the colony on Luna.';
        }
        return true;
    }
    bespokePlay(player) {
        const openColonies = player.production.megacredits <= -4 ?
            player.game.colonies.filter((colony) => colony.name === ColonyName_1.ColonyName.LUNA) :
            undefined;
        player.game.defer(new BuildColony_1.BuildColony(player, { title: 'Select colony for Pioneer Settlement', colonies: openColonies }));
        player.production.add(Resource_1.Resource.MEGACREDITS, -2);
        return undefined;
    }
}
exports.PioneerSettlement = PioneerSettlement;
//# sourceMappingURL=PioneerSettlement.js.map