"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeologicalExpedition = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const BoardType_1 = require("../../boards/BoardType");
const Resource_1 = require("../../../common/Resource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Priority_1 = require("../../deferredActions/Priority");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Phase_1 = require("../../../common/Phase");
const VALID_BONUSES = [
    SpaceBonus_1.SpaceBonus.TITANIUM,
    SpaceBonus_1.SpaceBonus.STEEL,
    SpaceBonus_1.SpaceBonus.PLANT,
    SpaceBonus_1.SpaceBonus.HEAT,
    SpaceBonus_1.SpaceBonus.MEGACREDITS,
    SpaceBonus_1.SpaceBonus.ANIMAL,
    SpaceBonus_1.SpaceBonus.MICROBE,
    SpaceBonus_1.SpaceBonus.ENERGY,
    SpaceBonus_1.SpaceBonus.DATA,
    SpaceBonus_1.SpaceBonus.SCIENCE,
];
class GeologicalExpedition extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.GEOLOGICAL_EXPEDITION,
            cost: 18,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.SCIENCE],
            victoryPoints: 2,
            metadata: {
                cardNumber: 'Pf17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you place a tile ON MARS gain 1 additional resource on the space. If the space has no bonus, gain 1 steel.', (eb) => {
                        eb.emptyTile().startEffect.plus().wild(1).or().steel(1).asterix();
                    }).br;
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        if (boardType !== BoardType_1.BoardType.MARS || space.spaceType === SpaceType_1.SpaceType.COLONY)
            return;
        if (cardOwner !== activePlayer)
            return;
        if (cardOwner.game.phase === Phase_1.Phase.SOLAR)
            return;
        if (space.tile?.covers !== undefined)
            return;
        const bonuses = space.bonus;
        if (bonuses.length === 0) {
            activePlayer.stock.add(Resource_1.Resource.STEEL, 1, { log: true });
            return;
        }
        const filtered = bonuses.filter((bonus) => VALID_BONUSES.includes(bonus));
        const unique = Array.from(new Set(filtered));
        const options = new OrOptions_1.OrOptions();
        options.title = 'Select an additional bonus from this space.';
        unique.forEach((bonus) => {
            options.options.push(new SelectOption_1.SelectOption(SpaceBonus_1.SpaceBonus.toString(bonus), 'Select')
                .andThen(() => {
                activePlayer.game.grantSpaceBonus(activePlayer, bonus, 1);
                return undefined;
            }));
        });
        if (options.options.length === 1) {
            options.options[0].cb();
            return;
        }
        if (options.options.length === 0) {
            return;
        }
        activePlayer.defer(options, Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
    }
}
exports.GeologicalExpedition = GeologicalExpedition;
