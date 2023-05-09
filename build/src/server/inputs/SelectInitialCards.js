"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInitialCards = void 0;
const AndOptions_1 = require("./AndOptions");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const SelectCard_1 = require("./SelectCard");
const Merger_1 = require("../cards/promo/Merger");
const CardName_1 = require("../../common/cards/CardName");
const titles = require("../../common/inputs/SelectInitialCards");
class SelectInitialCards extends AndOptions_1.AndOptions {
    constructor(player, cb) {
        super(() => {
            this.completed(corporation);
            cb(corporation);
            return undefined;
        });
        this.player = player;
        this.inputType = PlayerInputType_1.PlayerInputType.SELECT_INITIAL_CARDS;
        let corporation;
        this.title = ' ';
        this.buttonLabel = 'Start';
        this.options.push(new SelectCard_1.SelectCard(titles.SELECT_CORPORATION_TITLE, undefined, player.dealtCorporationCards, (cards) => {
            if (cards.length !== 1) {
                throw new Error('Only select 1 corporation card');
            }
            corporation = cards[0];
            return undefined;
        }, { min: 1, max: 1 }));
        if (player.game.gameOptions.twoCorpsVariant) {
            player.dealtPreludeCards.push(new Merger_1.Merger());
        }
        if (player.game.gameOptions.preludeExtension) {
            this.options.push(new SelectCard_1.SelectCard(titles.SELECT_PRELUDE_TITLE, undefined, player.dealtPreludeCards, (preludeCards) => {
                if (preludeCards.length !== 2) {
                    throw new Error('Only select 2 preludes');
                }
                player.preludeCardsInHand.push(...preludeCards);
                return undefined;
            }, { min: 2, max: 2 }));
        }
        if (player.game.gameOptions.ceoExtension) {
            this.options.push(new SelectCard_1.SelectCard(titles.SELECT_CEO_TITLE, undefined, player.dealtCeoCards, (ceoCards) => {
                if (ceoCards.length !== 1) {
                    throw new Error('Only select 1 CEO');
                }
                player.ceoCardsInHand.push(ceoCards[0]);
                player.dealtCeoCards.filter((c) => c !== ceoCards[0]).forEach((c) => player.game.ceoDeck.discard(c));
                return undefined;
            }, { min: 1, max: 1 }));
        }
        this.options.push(new SelectCard_1.SelectCard(titles.SELECT_PROJECTS_TITLE, undefined, player.dealtProjectCards, (cards) => {
            player.cardsInHand.push(...cards);
            return undefined;
        }, { min: 0, max: 10 }));
    }
    completed(corporation) {
        const player = this.player;
        const cardCost = corporation.cardCost !== undefined ? corporation.cardCost : player.cardCost;
        if (corporation.name !== CardName_1.CardName.BEGINNER_CORPORATION && player.cardsInHand.length * cardCost > corporation.startingMegaCredits) {
            player.cardsInHand = [];
            player.preludeCardsInHand = [];
            throw new Error('Too many cards selected');
        }
        player.dealtProjectCards.forEach((card) => {
            if (player.cardsInHand.includes(card) === false) {
                player.game.projectDeck.discard(card);
            }
        });
        player.dealtCorporationCards.forEach((card) => {
            if (card.name !== corporation.name) {
                player.game.corporationDeck.discard(card);
            }
        });
    }
}
exports.SelectInitialCards = SelectInitialCards;
