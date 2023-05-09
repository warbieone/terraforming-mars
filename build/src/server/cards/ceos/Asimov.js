"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asimov = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const shuffle_1 = require("../../utils/shuffle");
const Random_1 = require("../../../server/Random");
const constants_1 = require("../../../common/constants");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Size_1 = require("../../../common/cards/render/Size");
const Awards_1 = require("../../awards/Awards");
const AwardScorer_1 = require("../../awards/AwardScorer");
class Asimov extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.ASIMOV,
            metadata: {
                cardNumber: 'L01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.award().nbsp.colon().text('+' + constants_1.ASIMOV_AWARD_BONUS, Size_1.Size.LARGE);
                    b.br.br.br;
                    b.opgArrow().text('10-X').award().asterix();
                }),
                description: 'You have +' + constants_1.ASIMOV_AWARD_BONUS + ' score for all awards. Once per game, draw 10-X awards (min. 1), where X is the current generation number. You may put one into the game and fund it for free.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        if (player.game.isSoloMode())
            return false;
        return !player.game.allAwardsFunded();
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const awardCount = Math.max(1, 10 - game.generation);
        const validAwards = this.getValidAwards(player);
        (0, shuffle_1.inplaceShuffle)(validAwards, Random_1.UnseededRandom.INSTANCE);
        const freeAward = new OrOptions_1.OrOptions();
        freeAward.title = 'Select award to put into play and fund';
        freeAward.buttonLabel = 'Confirm';
        freeAward.options = validAwards.slice(0, awardCount).map((award) => this.selectAwardToFund(player, award));
        freeAward.options.push(new SelectOption_1.SelectOption('Do nothing', 'Confirm', () => {
            game.log('${0} chose not to fund any award', (b) => b.player(player));
            return undefined;
        }));
        return freeAward;
    }
    selectAwardToFund(player, award) {
        const game = player.game;
        const scorer = new AwardScorer_1.AwardScorer(game, award);
        const players = game.getPlayers().slice();
        players.sort((p1, p2) => scorer.get(p2) - scorer.get(p1));
        let title = 'Fund ' + award.name + ' award' + ' [';
        title += players
            .sort((a, b) => scorer.get(b) - scorer.get(a))
            .map((player) => player.name + ': ' + scorer.get(player))
            .join(' / ');
        title += ']';
        return new SelectOption_1.SelectOption(title, 'Confirm', () => {
            player.game.awards.push(award);
            player.game.fundAward(player, award);
            return undefined;
        });
    }
    getValidAwards(player) {
        const gameOptions = player.game.gameOptions;
        const validAwards = Awards_1.ALL_AWARDS.filter((award) => {
            if (player.game.awards.includes(award))
                return false;
            if (!gameOptions.venusNextExtension && award.name === 'Venuphile')
                return false;
            if (!gameOptions.turmoilExtension && award.name === 'Politician')
                return false;
            if (!gameOptions.aresExtension && award.name === 'Entrepreneur')
                return false;
            if (!gameOptions.moonExpansion && award.name === 'Full Moon')
                return false;
            if (!gameOptions.moonExpansion && award.name === 'Lunar Magnate')
                return false;
            return true;
        });
        if (validAwards.length === 0)
            throw new Error('getValidAwards award list is empty.');
        return validAwards;
    }
}
exports.Asimov = Asimov;
