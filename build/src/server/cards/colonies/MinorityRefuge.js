"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinorityRefuge = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const BuildColony_1 = require("../../deferredActions/BuildColony");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class MinorityRefuge extends Card_1.Card {
    constructor() {
        super({
            cost: 5,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.MINORITY_REFUGE,
            type: CardType_1.CardType.AUTOMATED,
            metadata: {
                cardNumber: 'C26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(-2)).colonies(1);
                }),
                description: 'Decrease your M€ production 2 steps. Place a colony.',
            },
        });
    }
    bespokeCanPlay(player) {
        if (player.colonies.getPlayableColonies().length === 0) {
            return false;
        }
        const megaCreditsProduction = player.production.megacredits;
        if (megaCreditsProduction === -4 && player.isCorporation(CardName_1.CardName.POSEIDON)) {
            return true;
        }
        else if (megaCreditsProduction <= -4) {
            const lunaIsAvailable = player.game.colonies.some((colony) => colony.name === ColonyName_1.ColonyName.LUNA &&
                colony.isFull() === false &&
                colony.colonies.includes(player.id) === false);
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
        player.game.defer(new BuildColony_1.BuildColony(player, {
            title: 'Select colony for Minority Refuge',
            colonies: openColonies,
            cb: () => {
                player.production.add(Resource_1.Resource.MEGACREDITS, -2);
            },
        }));
        return undefined;
    }
}
exports.MinorityRefuge = MinorityRefuge;
