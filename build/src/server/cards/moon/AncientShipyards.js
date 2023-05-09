"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AncientShipyards = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class AncientShipyards extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ANCIENT_SHIPYARDS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            cost: 6,
            resourceType: CardResource_1.CardResource.RESOURCE_CUBE,
            victoryPoints: { resourcesHere: {}, each: -1 },
            reserveUnits: { titanium: 3 },
            metadata: {
                description: 'Spend 3 titanium. -1 VP for every resource here.',
                cardNumber: 'M19',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Steal 2 M€ from each player and add a resource cube here.', (eb) => {
                        eb.empty().startAction.text('Steal').nbsp.megacredits(2, { all: Options_1.all }).asterix().colon().resourceCube(1);
                    }).br.br;
                    b.minus().titanium(3);
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const game = player.game;
        for (const p of game.getPlayers()) {
            if (p === player)
                continue;
            p.stealResource(Resource_1.Resource.MEGACREDITS, 2, player);
        }
        if (game.isSoloMode()) {
            player.addResource(Resource_1.Resource.MEGACREDITS, 2);
        }
        player.addResourceTo(this, 1);
        return undefined;
    }
}
exports.AncientShipyards = AncientShipyards;
