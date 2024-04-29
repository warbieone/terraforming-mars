"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningGuild = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("./CorporationCard");
const Phase_1 = require("../../../common/Phase");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const GainProduction_1 = require("../../deferredActions/GainProduction");
const CardRenderer_1 = require("../render/CardRenderer");
const BoardType_1 = require("../../boards/BoardType");
const Options_1 = require("../Options");
class MiningGuild extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.MINING_GUILD,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.BUILDING],
            startingMegaCredits: 36,
            behavior: {
                production: { steel: 1 },
                stock: { steel: 2 },
            },
            metadata: {
                cardNumber: 'R24',
                hasExternalHelp: true,
                description: 'You start with 36 M€, 2 steel and 1 steel production.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(36).nbsp.steel(2, { digit: Options_1.digit }).nbsp.production((pb) => pb.steel(1));
                    b.corpBox('effect', (ce) => {
                        ce.effect('Each time you get any steel as a placement bonus on the map, increase your steel production 1 step. Same for titanium.', (eb) => {
                            eb.steel(1).asterix().colon();
                            eb.production((pb) => pb.steel(1));
                            eb.titanium(1).asterix();
                            eb.startEffect.production((pb) => pb.titanium(1));
                        });
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        if (boardType !== BoardType_1.BoardType.MARS) {
            return;
        }
        if (cardOwner.id !== activePlayer.id || cardOwner.game.phase === Phase_1.Phase.SOLAR) {
            return;
        }
        if (space.tile?.covers !== undefined) {
            return;
        }
        if (space.bonus.some((bonus) => bonus === SpaceBonus_1.SpaceBonus.STEEL)) {
            cardOwner.game.defer(new GainProduction_1.GainProduction(cardOwner, Resource_1.Resource.STEEL));
        }
        if (space.bonus.some((bonus) => bonus === SpaceBonus_1.SpaceBonus.TITANIUM)) {
            cardOwner.game.defer(new GainProduction_1.GainProduction(cardOwner, Resource_1.Resource.TITANIUM));
        }
    }
}
exports.MiningGuild = MiningGuild;
