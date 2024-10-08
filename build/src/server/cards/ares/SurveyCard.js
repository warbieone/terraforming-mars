"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyCard = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const GainResources_1 = require("../../deferredActions/GainResources");
const Phase_1 = require("../../../common/Phase");
const BoardType_1 = require("../../boards/BoardType");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const PartyHooks_1 = require("../../turmoil/parties/PartyHooks");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Board_1 = require("../../boards/Board");
const AresHandler_1 = require("../../ares/AresHandler");
class SurveyCard extends Card_1.Card {
    constructor(properties) {
        super(properties);
    }
    anyAdjacentSpaceGivesBonus(board, space, bonus) {
        return board.getAdjacentSpaces(space).some((adj) => adj.adjacency?.bonus.includes(bonus));
    }
    grantsBonusNow(space, bonus) {
        return space.tile?.covers === undefined && space.bonus.includes(bonus);
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        if (boardType !== BoardType_1.BoardType.MARS) {
            return;
        }
        if (cardOwner.game.phase === Phase_1.Phase.SOLAR || cardOwner.id !== activePlayer.id) {
            return;
        }
        this.checkForBonuses(cardOwner, space);
    }
    log(cardOwner, resource) {
        cardOwner.game.log('${0} gained a bonus ${1} because of ${2}', (b) => b.player(cardOwner).string(resource).cardName(this.name));
    }
    maybeRewardStandardResource(cardOwner, space, resource, bonus) {
        const board = cardOwner.game.board;
        let grant = this.grantsBonusNow(space, bonus) || this.anyAdjacentSpaceGivesBonus(board, space, bonus);
        if (!grant) {
            switch (resource) {
                case Resource_1.Resource.STEEL:
                    grant = space.spaceType !== SpaceType_1.SpaceType.COLONY &&
                        PartyHooks_1.PartyHooks.shouldApplyPolicy(cardOwner, PartyName_1.PartyName.MARS, 'mfp01');
                    break;
                case Resource_1.Resource.PLANTS:
                    grant = Board_1.Board.isUncoveredOceanSpace(space) &&
                        cardOwner.cardIsInEffect(CardName_1.CardName.ARCTIC_ALGAE);
            }
        }
        if (grant) {
            cardOwner.game.defer(new GainResources_1.GainResources(cardOwner, resource).andThen(() => this.log(cardOwner, resource)));
        }
    }
    maybeRewardCardResource(cardOwner, space, resource, bonus) {
        const board = cardOwner.game.board;
        if (cardOwner.playedCards.some((card) => card.resourceType === resource) &&
            (this.grantsBonusNow(space, bonus) || AresHandler_1.AresHandler.anyAdjacentSpaceGivesBonus(board, space, bonus))) {
            cardOwner.game.defer(new AddResourcesToCard_1.AddResourcesToCard(cardOwner, resource, { log: false }))
                .andThen(() => this.log(cardOwner, resource));
        }
    }
}
exports.SurveyCard = SurveyCard;
