"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sabotage = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class Sabotage extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SABOTAGE,
            cost: 1,
            metadata: {
                cardNumber: '121',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(3, { all: Options_1.all, digit: Options_1.digit }).nbsp.or(Size_1.Size.SMALL).nbsp;
                    b.minus().steel(4, { all: Options_1.all, digit: Options_1.digit }).br.or(Size_1.Size.SMALL).nbsp;
                    b.minus().megacredits(7, { all: Options_1.all });
                }),
                description: 'Remove up to 3 titanium from any player, or 4 steel, or 7 M€.',
            },
        });
    }
    bespokePlay(player) {
        if (player.game.isSoloMode())
            return undefined;
        const availablePlayerTargets = player.game.getPlayers().filter((p) => p.id !== player.id);
        const availableActions = new OrOptions_1.OrOptions();
        availablePlayerTargets.forEach((target) => {
            if (target.titanium > 0 && !target.alloysAreProtected()) {
                const amountRemoved = Math.min(3, target.titanium);
                const optionTitle = 'Remove ' + amountRemoved + ' titanium from ' + target.name;
                availableActions.options.push(new SelectOption_1.SelectOption(optionTitle, 'Confirm', () => {
                    target.deductResource(Resource_1.Resource.TITANIUM, 3, { log: true, from: player });
                    return undefined;
                }));
            }
            if (target.steel > 0 && !target.alloysAreProtected()) {
                const amountRemoved = Math.min(4, target.steel);
                const optionTitle = 'Remove ' + amountRemoved + ' steel from ' + target.name;
                availableActions.options.push(new SelectOption_1.SelectOption(optionTitle, 'Confirm', () => {
                    target.deductResource(Resource_1.Resource.STEEL, 4, { log: true, from: player });
                    return undefined;
                }));
            }
            if (target.megaCredits > 0) {
                const amountRemoved = Math.min(7, target.megaCredits);
                const optionTitle = 'Remove ' + amountRemoved + ' M€ from ' + target.name;
                availableActions.options.push(new SelectOption_1.SelectOption(optionTitle, 'Confirm', () => {
                    target.deductResource(Resource_1.Resource.MEGACREDITS, 7, { log: true, from: player });
                    return undefined;
                }));
            }
        });
        if (availableActions.options.length > 0) {
            availableActions.options.push(new SelectOption_1.SelectOption('Do not remove resource', 'Confirm', () => {
                return undefined;
            }));
            return availableActions;
        }
        return undefined;
    }
}
exports.Sabotage = Sabotage;
