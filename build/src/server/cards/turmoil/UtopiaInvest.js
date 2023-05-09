"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtopiaInvest = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class UtopiaInvest extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.UTOPIA_INVEST,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 40,
            type: CardType_1.CardType.CORPORATION,
            behavior: {
                production: { steel: 1, titanium: 1 },
            },
            metadata: {
                cardNumber: 'R33',
                description: 'You start with 40 M€. Increase your steel and titanium production 1 step each.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(40).nbsp.production((pb) => pb.steel(1).titanium(1));
                    b.corpBox('action', (ce) => {
                        ce.action('Decrease any production to gain 4 resources of that kind.', (eb) => {
                            eb.production((eb) => eb.wild(1)).startAction.wild(4, { digit: Options_1.digit });
                        });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.production.megacredits +
            player.production.steel +
            player.production.titanium +
            player.production.plants +
            player.production.energy +
            player.production.heat > -5;
    }
    log(player, type) {
        player.game.log('${0} decreased ${1} production 1 step to gain 4 ${2}', (b) => b.player(player).string(type).string(type));
    }
    action(player) {
        const result = new OrOptions_1.OrOptions();
        result.title = 'Select production to decrease one step and gain 4 resources';
        const options = [];
        const reduceMegacredits = new SelectOption_1.SelectOption('Decrease M€ production', 'Decrease production', () => {
            player.production.add(Resource_1.Resource.MEGACREDITS, -1);
            player.megaCredits += 4;
            this.log(player, 'megacredit');
            return undefined;
        });
        const reduceSteel = new SelectOption_1.SelectOption('Decrease steel production', 'Decrease production', () => {
            player.production.add(Resource_1.Resource.STEEL, -1);
            player.steel += 4;
            this.log(player, 'steel');
            return undefined;
        });
        const reduceTitanium = new SelectOption_1.SelectOption('Decrease titanium production', 'Decrease production', () => {
            player.production.add(Resource_1.Resource.TITANIUM, -1);
            player.titanium += 4;
            this.log(player, 'titanium');
            return undefined;
        });
        const reducePlants = new SelectOption_1.SelectOption('Decrease plants production', 'Decrease production', () => {
            player.production.add(Resource_1.Resource.PLANTS, -1);
            player.plants += 4;
            this.log(player, 'plant');
            return undefined;
        });
        const reduceEnergy = new SelectOption_1.SelectOption('Decrease energy production', 'Decrease production', () => {
            player.production.add(Resource_1.Resource.ENERGY, -1);
            player.energy += 4;
            this.log(player, 'energy');
            return undefined;
        });
        const reduceHeat = new SelectOption_1.SelectOption('Decrease heat production', 'Decrease production', () => {
            player.production.add(Resource_1.Resource.HEAT, -1);
            player.heat += 4;
            this.log(player, 'heat');
            return undefined;
        });
        if (player.production.megacredits > -5) {
            options.push(reduceMegacredits);
        }
        if (player.production.steel > 0) {
            options.push(reduceSteel);
        }
        if (player.production.titanium > 0) {
            options.push(reduceTitanium);
        }
        if (player.production.plants > 0) {
            options.push(reducePlants);
        }
        if (player.production.energy > 0) {
            options.push(reduceEnergy);
        }
        if (player.production.heat > 0) {
            options.push(reduceHeat);
        }
        result.options = options;
        return result;
    }
}
exports.UtopiaInvest = UtopiaInvest;
