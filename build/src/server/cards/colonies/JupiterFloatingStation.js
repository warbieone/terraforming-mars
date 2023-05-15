"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JupiterFloatingStation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class JupiterFloatingStation extends Card_1.Card {
    constructor() {
        super({
            cost: 9,
            tags: [Tag_1.Tag.JOVIAN],
            name: CardName_1.CardName.JUPITER_FLOATING_STATION,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            victoryPoints: 1,
            metadata: {
                cardNumber: 'C19',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to a JOVIAN CARD.', (eb) => {
                        eb.empty().startAction.floaters(1, { secondaryTag: Tag_1.Tag.JOVIAN });
                    }).br;
                    b.or().br;
                    b.action('Gain 1 M€ for every floater here [MAX 4].', (eb) => {
                        eb.empty().startAction;
                        eb.megacredits(1).slash().floaters(1).text('[max 4]', Size_1.Size.SMALL);
                    });
                }),
                description: {
                    text: 'Requires 3 science tags.',
                    align: 'left',
                },
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Add 1 floater to a Jovian card', 'Add floater', () => {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, {
                restrictedTag: Tag_1.Tag.JOVIAN, title: 'Add 1 floater to a Jovian card',
            }));
            return undefined;
        }), new SelectOption_1.SelectOption('Gain 1 M€ per floater here (max 4) ', 'Gain M€', () => {
            player.addResource(Resource_1.Resource.MEGACREDITS, Math.min(this.resourceCount, 4), { log: true });
            return undefined;
        }));
    }
}
exports.JupiterFloatingStation = JupiterFloatingStation;
//# sourceMappingURL=JupiterFloatingStation.js.map