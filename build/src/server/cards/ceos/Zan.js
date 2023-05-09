"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zan = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Turmoil_1 = require("../../turmoil/Turmoil");
const Size_1 = require("../../../common/cards/render/Size");
const Resource_1 = require("../../../common/Resource");
class Zan extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.ZAN,
            metadata: {
                cardNumber: 'L26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.redsInactive().asterix();
                    b.br.br;
                    b.opgArrow().text('ALL', Size_1.Size.SMALL).delegates(1).colon().reds().megacredits(1);
                }),
                description: 'You are immune to Reds\' ruling policy. Once per game, place all of your available delegates in Reds. Gain 1 M€ for each delegate placed this way.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const turmoil = Turmoil_1.Turmoil.getTurmoil(game);
        const totalDelegatesPlaced = turmoil.getAvailableDelegateCount(player.id);
        while (turmoil.getAvailableDelegateCount(player.id) > 0) {
            turmoil.sendDelegateToParty(player.id, PartyName_1.PartyName.REDS, game);
        }
        player.addResource(Resource_1.Resource.MEGACREDITS, totalDelegatesPlaced, { log: true });
        return undefined;
    }
}
exports.Zan = Zan;
