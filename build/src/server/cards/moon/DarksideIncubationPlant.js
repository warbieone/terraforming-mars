"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarksideIncubationPlant = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const LogHelper_1 = require("../../LogHelper");
class DarksideIncubationPlant extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.DARKSIDE_INCUBATION_PLANT,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.MOON],
            cost: 11,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 2 },
            reserveUnits: { titanium: 1 },
            metadata: {
                description: {
                    text: 'Spend 1 titanium. 1 VP for every 2 microbes here.',
                    align: 'left',
                },
                cardNumber: 'M45',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe here.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.action('Spend 2 microbes to raise the habitat rate 1 step.', (eb) => {
                        eb.microbes(2).startAction.moonHabitatRate();
                    });
                    b.br;
                    b.minus().titanium(1);
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    canRaiseHabitatRate(player) {
        return this.resourceCount >= 2 && player.canAfford(0, { tr: { moonHabitat: 1 } });
    }
    action(player) {
        const options = [];
        MoonExpansion_1.MoonExpansion.ifMoon(player.game, (moonData) => {
            if (this.canRaiseHabitatRate(player) && moonData.colonyRate < 8) {
                options.push(new SelectOption_1.SelectOption('Spend 2 microbes to raise the habitat rate 1 step.', 'Select', () => {
                    player.removeResourceFrom(this, 2);
                    LogHelper_1.LogHelper.logRemoveResource(player, this, 2, 'raise the habitat rate');
                    MoonExpansion_1.MoonExpansion.raiseHabitatRate(player);
                    return undefined;
                }));
            }
        });
        options.push(new SelectOption_1.SelectOption('Add 1 microbe to this card', 'Select', () => {
            player.addResourceTo(this, 1);
            return undefined;
        }));
        if (options.length === 1) {
            return options[0].cb();
        }
        else {
            return new OrOptions_1.OrOptions(...options);
        }
    }
}
exports.DarksideIncubationPlant = DarksideIncubationPlant;
