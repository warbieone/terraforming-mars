"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInitialCards = void 0;
const titles = require("../../common/inputs/SelectInitialCards");
const SelectCard_1 = require("./SelectCard");
const Merger_1 = require("../cards/promo/Merger");
const CardName_1 = require("../../common/cards/CardName");
const InputError_1 = require("./InputError");
const OptionsPlayerInput_1 = require("./OptionsPlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectInitialCards extends OptionsPlayerInput_1.OptionsInput {
    constructor(player, cb) {
        super('initialCards', '', []);
        this.player = player;
        const game = player.game;
        let corporation;
        this.title = ' ';
        this.buttonLabel = 'Start';
        this.options.push(new SelectCard_1.SelectCard(titles.SELECT_CORPORATION_TITLE, undefined, player.dealtCorporationCards, { min: 1, max: 1 }).andThen((cards) => {
            if (cards.length !== 1) {
                throw new InputError_1.InputError('Only select 1 corporation card');
            }
            corporation = cards[0];
            return undefined;
        }));
        if (game.gameOptions.twoCorpsVariant) {
            player.dealtPreludeCards.push(new Merger_1.Merger());
        }
        if (game.gameOptions.preludeExtension) {
            this.options.push(new SelectCard_1.SelectCard(titles.SELECT_PRELUDE_TITLE, undefined, player.dealtPreludeCards, { min: 2, max: 2 })
                .andThen((preludeCards) => {
                if (preludeCards.length !== 2) {
                    throw new InputError_1.InputError('Only select 2 preludes');
                }
                player.preludeCardsInHand.push(...preludeCards);
                return undefined;
            }));
        }
        if (game.gameOptions.ceoExtension) {
            this.options.push(new SelectCard_1.SelectCard(titles.SELECT_CEO_TITLE, undefined, player.dealtCeoCards, { min: 1, max: 1 }).andThen((ceoCards) => {
                if (ceoCards.length !== 1) {
                    throw new InputError_1.InputError('Only select 1 CEO');
                }
                player.ceoCardsInHand.push(ceoCards[0]);
                return undefined;
            }));
        }
        this.options.push(new SelectCard_1.SelectCard(titles.SELECT_PROJECTS_TITLE, undefined, player.dealtProjectCards, { min: 0, max: 10 })
            .andThen((cards) => {
            player.cardsInHand.push(...cards);
            return undefined;
        }));
        this.andThen(() => {
            this.completed(corporation);
            cb(corporation);
            return undefined;
        });
    }
    completed(corporation) {
        const player = this.player;
        const game = player.game;
        const cardCost = corporation.cardCost !== undefined ? corporation.cardCost : player.cardCost;
        if (corporation.name !== CardName_1.CardName.BEGINNER_CORPORATION && player.cardsInHand.length * cardCost > corporation.startingMegaCredits) {
            player.cardsInHand = [];
            player.preludeCardsInHand = [];
            throw new InputError_1.InputError('Too many cards selected');
        }
        for (const card of player.dealtProjectCards) {
            if (player.cardsInHand.includes(card) === false) {
                game.projectDeck.discard(card);
            }
        }
        for (const card of player.dealtCorporationCards) {
            if (card.name !== corporation.name) {
                game.corporationDeck.discard(card);
            }
        }
        for (const card of player.dealtPreludeCards) {
            if (player.preludeCardsInHand.includes(card) === false) {
                game.preludeDeck.discard(card);
            }
        }
        for (const card of player.dealtCeoCards) {
            if (player.ceoCardsInHand.includes(card) === false) {
                game.ceoDeck.discard(card);
            }
        }
    }
    toModel(player) {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'initialCards',
            options: this.options.map((option) => option.toModel(player)),
        };
    }
    process(input, player) {
        if (!(0, InputResponse_1.isSelectInitialCardsResponse)(input)) {
            throw new InputError_1.InputError('Not a valid SelectInitialCardsResponse');
        }
        if (input.responses.length !== this.options.length) {
            throw new InputError_1.InputError('Incorrect options provided');
        }
        for (let i = 0; i < input.responses.length; i++) {
            player.runInput(input.responses[i], this.options[i]);
        }
        return this.cb(undefined);
    }
}
exports.SelectInitialCards = SelectInitialCards;
