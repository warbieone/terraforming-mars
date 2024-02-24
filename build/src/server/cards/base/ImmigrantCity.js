"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImmigrantCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const GainProduction_1 = require("../../deferredActions/GainProduction");
const LoseProduction_1 = require("../../deferredActions/LoseProduction");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ImmigrantCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.IMMIGRANT_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 13,
            metadata: {
                cardNumber: '200',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When a city tile is placed, including this, increase your M€ production 1 step.', (eb) => {
                        eb.city({ all: Options_1.all }).startEffect.production((pb) => pb.megacredits(1));
                    }).br;
                    b.production((pb) => pb.minus().energy(1).megacredits(-2)).city();
                }),
                description: 'Decrease your energy production 1 step and decrease your M€ production 2 steps. Place a city tile.',
            },
        });
    }
    bespokeCanPlay(player) {
        const hasEnergyProduction = player.production.energy >= 1;
        const canPlaceCityOnMars = player.game.board.getAvailableSpacesForCity(player).length > 0;
        const canDecreaseMcProduction = player.production.megacredits >= -4 || player.isCorporation(CardName_1.CardName.THARSIS_REPUBLIC);
        return hasEnergyProduction && canDecreaseMcProduction && canPlaceCityOnMars;
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isCitySpace(space)) {
            cardOwner.game.defer(new GainProduction_1.GainProduction(cardOwner, Resource_1.Resource.MEGACREDITS), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : undefined);
        }
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace('Select space for city tile', player.game.board.getAvailableSpacesForCity(player))
            .andThen((space) => {
            player.game.addCity(player, space);
            player.game.defer(new LoseProduction_1.LoseProduction(player, Resource_1.Resource.ENERGY, { count: 1 }));
            player.game.defer(new LoseProduction_1.LoseProduction(player, Resource_1.Resource.MEGACREDITS, { count: 2 }));
            return undefined;
        });
    }
}
exports.ImmigrantCity = ImmigrantCity;
