"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vitor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
class Vitor extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.VITOR,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 54,
            initialActionText: 'Fund an award for free',
            metadata: {
                cardNumber: 'R35',
                description: 'You start with 52 M€. As your first action, fund an award for free.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(52).nbsp.award();
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play a card with a NON-NEGATIVE VP icon, including this, gain 2 M€.', (eb) => {
                            eb.vpIcon().asterix().startEffect.megacredits(2);
                        });
                    });
                }),
            },
        });
    }
    selectAwardToFund(player, award) {
        return new SelectOption_1.SelectOption('Fund ' + award.name + ' award', 'Confirm', () => {
            player.game.fundAward(player, award);
            return undefined;
        });
    }
    initialAction(player) {
        const game = player.game;
        if (game.isSoloMode())
            return;
        const freeAward = new OrOptions_1.OrOptions();
        freeAward.title = 'Select award to fund';
        freeAward.buttonLabel = 'Confirm';
        const availableAwards = game.awards.filter((award) => !game.fundedAwards.map((fa) => fa.award).includes(award));
        freeAward.options = availableAwards.map((award) => this.selectAwardToFund(player, award));
        return freeAward;
    }
    onCardPlayed(player, card) {
        if (!player.isCorporation(this.name)) {
            return;
        }
        const victoryPoints = card.metadata.victoryPoints;
        if (victoryPoints === undefined)
            return;
        if (typeof (victoryPoints) === 'number') {
            if (victoryPoints <= 0)
                return;
        }
        else {
            if (victoryPoints.points <= 0)
                return;
        }
        player.megaCredits += 2;
    }
}
exports.Vitor = Vitor;
//# sourceMappingURL=Vitor.js.map