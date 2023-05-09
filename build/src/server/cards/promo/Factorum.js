"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factorum = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class Factorum extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.FACTORUM,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            startingMegaCredits: 37,
            behavior: {
                production: { steel: 1 },
            },
            metadata: {
                cardNumber: 'R22',
                description: 'You start with 37 M€. Increase your steel production 1 step.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(37).nbsp.production((pb) => pb.steel(1));
                    b.corpBox('action', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.action('Increase your energy production 1 step IF YOU HAVE NO ENERGY RESOURCES, or spend 3M€ to draw a building card.', (eb) => {
                            eb.empty().arrow().production((pb) => pb.energy(1)).asterix();
                            eb.or().megacredits(3).startAction.cards(1, { secondaryTag: Tag_1.Tag.BUILDING });
                        });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.energy === 0 || player.canAfford(3);
    }
    action(player) {
        const increaseEnergy = new SelectOption_1.SelectOption('Increase your energy production 1 step', 'Increase production', () => {
            player.production.add(Resource_1.Resource.ENERGY, 1, { log: true });
            return undefined;
        });
        const drawBuildingCard = new SelectOption_1.SelectOption('Spend 3 M€ to draw a building card', 'Draw card', () => {
            player.payMegacreditsDeferred(3, 'Select how to pay for Factorum action.', () => player.drawCard(1, { tag: Tag_1.Tag.BUILDING }));
            return undefined;
        });
        if (player.energy > 0)
            return drawBuildingCard;
        if (!player.canAfford(3))
            return increaseEnergy;
        return new OrOptions_1.OrOptions(increaseEnergy, drawBuildingCard);
    }
}
exports.Factorum = Factorum;
