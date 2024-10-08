"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheDarksideofTheMoonSyndicate = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const mnemonist_1 = require("mnemonist");
const Resource_1 = require("../../../common/Resource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Size_1 = require("../../../common/cards/render/Size");
const Phase_1 = require("../../../common/Phase");
const Options_1 = require("../Options");
const Payment_1 = require("../../../common/inputs/Payment");
class TheDarksideofTheMoonSyndicate extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.THE_DARKSIDE_OF_THE_MOON_SYNDICATE,
            tags: [Tag_1.Tag.MOON],
            startingMegaCredits: 40,
            resourceType: CardResource_1.CardResource.SYNDICATE_FLEET,
            behavior: {
                addResources: 2,
            },
            metadata: {
                cardNumber: 'MC3',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(40).resource(CardResource_1.CardResource.SYNDICATE_FLEET, 2).br;
                    b.text('You start with 40 M€ and 2 syndicate fleets on this card.', Size_1.Size.SMALL, false, false).br;
                    b.titanium(1).arrow(Size_1.Size.SMALL).resource(CardResource_1.CardResource.SYNDICATE_FLEET)
                        .slash(Size_1.Size.SMALL)
                        .resource(CardResource_1.CardResource.SYNDICATE_FLEET).arrow(Size_1.Size.SMALL).text('steal', Size_1.Size.TINY).megacredits(2, { all: Options_1.all }).asterix().br;
                    b.text('Action: Spend 1 titanium to add 1 syndicate fleet on this card OR ' +
                        'remove 1 syndicate fleet from this card to steal 2M€ from every opponent.', Size_1.Size.TINY, false, false).br;
                    b.effect('When you place a tile on The Moon, steal 2 M€ from opponents for each of their tiles next to yours.', (eb) => {
                        eb.emptyTile('normal', { size: Size_1.Size.SMALL, secondaryTag: Tag_1.Tag.MOON })
                            .startEffect
                            .text('STEAL').megacredits(2, { all: Options_1.all }).slash().emptyTile('normal', { size: Size_1.Size.SMALL }).emptyTile('normal', { size: Size_1.Size.SMALL, all: Options_1.all });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.titanium > 0 || this.resourceCount > 0;
    }
    action(player) {
        const orOptions = new OrOptions_1.OrOptions();
        if (player.titanium > 0) {
            orOptions.options.push(new SelectOption_1.SelectOption('Spend 1 titanium to add 1 syndicate fleet on this card', 'Add syndicate fleet').andThen(() => {
                player.pay(Payment_1.Payment.of({ titanium: 1 }));
                player.addResourceTo(this, { qty: 1, log: true });
                return undefined;
            }));
        }
        if (this.resourceCount > 0) {
            orOptions.options.push(new SelectOption_1.SelectOption('Remove 1 syndicate fleet from this card to steal 2M€ from every opponent.', 'Remove syndicate fleet').andThen(() => {
                player.removeResourceFrom(this);
                for (const target of player.getOpponents()) {
                    target.maybeBlockAttack(player, (proceed) => {
                        if (proceed) {
                            target.stock.steal(Resource_1.Resource.MEGACREDITS, 2, player);
                        }
                        return undefined;
                    });
                }
                return undefined;
            }));
        }
        if (orOptions.options.length === 1) {
            return orOptions.options[0].cb();
        }
        return orOptions;
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (activePlayer.game.phase === Phase_1.Phase.SOLAR) {
            return;
        }
        if (activePlayer !== cardOwner) {
            return undefined;
        }
        if (space.tile === undefined) {
            return undefined;
        }
        const game = activePlayer.game;
        if (MoonExpansion_1.MoonExpansion.MOON_TILES.has(space.tile.tileType)) {
            const costs = new mnemonist_1.MultiSet();
            MoonExpansion_1.MoonExpansion.moonData(game).moon.getAdjacentSpaces(space).forEach((space) => {
                if (space.tile !== undefined && space.player !== undefined && space.player !== activePlayer) {
                    costs.add(space.player, 2);
                }
            });
            costs.forEachMultiplicity((qty, target) => {
                const adjustedQuantity = Math.min(qty, target.megaCredits);
                activePlayer.stock.add(Resource_1.Resource.MEGACREDITS, adjustedQuantity, { log: true });
                target.stock.deduct(Resource_1.Resource.MEGACREDITS, adjustedQuantity, { log: true, from: activePlayer });
            });
        }
        return undefined;
    }
}
exports.TheDarksideofTheMoonSyndicate = TheDarksideofTheMoonSyndicate;
