"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LakefrontResorts = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const Priority_1 = require("../../deferredActions/Priority");
const GainProduction_1 = require("../../deferredActions/GainProduction");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const Board_1 = require("../../boards/Board");
class LakefrontResorts extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.LAKEFRONT_RESORTS,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 54,
            metadata: {
                cardNumber: 'R38',
                description: 'You start with 54 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(54);
                    b.corpBox('effect', (ce) => {
                        ce.vSpace(Size_1.Size.MEDIUM);
                        ce.effect('When any ocean tile is placed, increase your M€ production 1 step. Your bonus for placing adjacent to oceans is 3M€ instead of 2 M€.', (eb) => {
                            eb.oceans(1, { size: Size_1.Size.SMALL, all: Options_1.all }).colon().production((pb) => pb.megacredits(1));
                            eb.emptyTile('normal', { size: Size_1.Size.SMALL }).oceans(1, { size: Size_1.Size.SMALL });
                            eb.startEffect.megacredits(3);
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        player.oceanBonus = 3;
        return undefined;
    }
    onDiscard(player) {
        player.oceanBonus = 2;
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isUncoveredOceanSpace(space)) {
            cardOwner.game.defer(new GainProduction_1.GainProduction(cardOwner, Resource_1.Resource.MEGACREDITS), cardOwner.id !== activePlayer.id ? Priority_1.Priority.OPPONENT_TRIGGER : undefined);
        }
    }
}
exports.LakefrontResorts = LakefrontResorts;
