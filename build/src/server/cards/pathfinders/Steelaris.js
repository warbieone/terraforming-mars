"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steelaris = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const TileType_1 = require("../../../common/TileType");
const GainStock_1 = require("../../deferredActions/GainStock");
const Priority_1 = require("../../deferredActions/Priority");
const Size_1 = require("../../../common/cards/render/Size");
const BoardType_1 = require("../../boards/BoardType");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Units_1 = require("../../../common/Units");
class Steelaris extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.STEELARIS,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            startingMegaCredits: 42,
            metadata: {
                cardNumber: 'PfC9',
                description: 'You start with 42 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(42).br;
                    b.corpBox('effect', (ce) => {
                        ce.effect('When any city or special tile is placed ON MARS, gain 1 steel and 1 plant.', (eb) => {
                            eb.city({ size: Size_1.Size.SMALL, all: Options_1.all }).slash().specialTile({ size: Size_1.Size.SMALL, all: Options_1.all }).startEffect.steel(1).plants(1);
                        });
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        const game = cardOwner.game;
        if (boardType !== BoardType_1.BoardType.MARS) {
            return;
        }
        if (space.spaceType === SpaceType_1.SpaceType.COLONY) {
            return;
        }
        const tileType = space.tile?.tileType;
        if (tileType === TileType_1.TileType.OCEAN || tileType === TileType_1.TileType.GREENERY) {
            return;
        }
        game.defer(new GainStock_1.GainStock(cardOwner, Units_1.Units.of({ steel: 1, plants: 1 }), {
            cb: () => game.log('${0} gained 1 ${1} and 1 ${2} from ${3}', (b) => b.player(cardOwner).string(Resource_1.Resource.STEEL).string(Resource_1.Resource.PLANTS).cardName(this.name)),
        }), cardOwner.id !== activePlayer.id ? Priority_1.Priority.OPPONENT_TRIGGER : undefined);
    }
}
exports.Steelaris = Steelaris;
