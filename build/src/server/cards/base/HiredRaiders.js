"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiredRaiders = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class HiredRaiders extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.HIRED_RAIDERS,
            cost: 1,
            metadata: {
                cardNumber: '124',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('steal', Size_1.Size.MEDIUM, true).steel(2, { all: Options_1.all }).br;
                    b.or().br;
                    b.text('steal', Size_1.Size.MEDIUM, true).megacredits(3, { all: Options_1.all });
                }),
                description: 'Steal up to 2 steel, or 3 M€ from any player.',
            },
        });
    }
    bespokePlay(player) {
        if (player.game.isSoloMode()) {
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Steal 2 steel', 'Steal steel', () => {
                player.steel += 2;
                return undefined;
            }), new SelectOption_1.SelectOption('Steal 3 M€', 'Steal M€', () => {
                player.megaCredits += 3;
                return undefined;
            }));
        }
        const availablePlayerTargets = player.game.getPlayers().filter((p) => p.id !== player.id);
        const availableActions = new OrOptions_1.OrOptions();
        availablePlayerTargets.forEach((target) => {
            if (target.steel > 0 && !target.alloysAreProtected()) {
                const amountStolen = Math.min(2, target.steel);
                const optionTitle = (0, MessageBuilder_1.newMessage)('Steal ${0} steel from ${1}', (b) => b.number(amountStolen).player(target).getMessage());
                availableActions.options.push(new SelectOption_1.SelectOption(optionTitle, 'Confirm', () => {
                    player.steel += amountStolen;
                    target.deductResource(Resource_1.Resource.STEEL, 2, { log: true, from: player, stealing: true });
                    return undefined;
                }));
            }
            if (target.megaCredits > 0) {
                const amountStolen = Math.min(3, target.megaCredits);
                const optionTitle = (0, MessageBuilder_1.newMessage)('Steal ${0} M€ from ${1}', (b) => b.number(amountStolen).player(target));
                availableActions.options.push(new SelectOption_1.SelectOption(optionTitle, 'Confirm', () => {
                    player.megaCredits += amountStolen;
                    target.deductResource(Resource_1.Resource.MEGACREDITS, 3, { log: true, from: player, stealing: true });
                    return undefined;
                }));
            }
        });
        if (availableActions.options.length > 0) {
            availableActions.options.push(new SelectOption_1.SelectOption('Do not steal', 'Confirm', () => {
                return undefined;
            }));
            return availableActions;
        }
        return undefined;
    }
}
exports.HiredRaiders = HiredRaiders;
