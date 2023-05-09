"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TharsisRepublic = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const GainResources_1 = require("../../deferredActions/GainResources");
const GainProduction_1 = require("../../deferredActions/GainProduction");
const Board_1 = require("../../boards/Board");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class TharsisRepublic extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.THARSIS_REPUBLIC,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 40,
            firstAction: {
                text: 'Place a city tile',
                city: {},
            },
            metadata: {
                cardNumber: 'R31',
                description: 'You start with 40 M€. As your first action in the game, place a city tile.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(40).nbsp.city();
                    b.corpBox('effect', (ce) => {
                        ce.effect('When any city tile is placed ON MARS, increase your M€ production 1 step. When you place a city tile, gain 3 M€.', (eb) => {
                            eb.city({ size: Size_1.Size.SMALL, all: Options_1.all }).asterix().colon();
                            eb.production((pb) => pb.megacredits(1)).nbsp;
                            eb.city({ size: Size_1.Size.SMALL }).startEffect.megacredits(3);
                        });
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isCitySpace(space)) {
            if (cardOwner.id === activePlayer.id) {
                cardOwner.game.defer(new GainResources_1.GainResources(cardOwner, Resource_1.Resource.MEGACREDITS, { count: 3 }));
            }
            if (space.spaceType !== SpaceType_1.SpaceType.COLONY) {
                cardOwner.game.defer(new GainProduction_1.GainProduction(cardOwner, Resource_1.Resource.MEGACREDITS), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : undefined);
            }
        }
        return;
    }
    bespokePlay(player) {
        if (player.game.isSoloMode()) {
            player.production.add(Resource_1.Resource.MEGACREDITS, 2);
        }
        return undefined;
    }
}
exports.TharsisRepublic = TharsisRepublic;
