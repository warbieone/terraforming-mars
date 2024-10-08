"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambient = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const constants_1 = require("../../../common/constants");
const Size_1 = require("../../../common/cards/render/Size");
const Units_1 = require("../../../common/Units");
class Ambient extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.AMBIENT,
            tags: [Tag_1.Tag.VENUS],
            startingMegaCredits: 38,
            firstAction: {
                text: 'Raise the Venus scale 2 steps.',
                global: { venus: 2 },
            },
            metadata: {
                cardNumber: 'PfC3',
                description: 'You start with 38 M€. As your first action, raise the Venus scale 2 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(38).venus(2, { size: Size_1.Size.SMALL }).br;
                    b.effect('When you play a card with a Venus tag (including this) increase your heat production 1 step.', (eb) => {
                        eb.tag(Tag_1.Tag.VENUS).startEffect.production((pb) => pb.heat(1));
                    }).br;
                    b.action('When temperature is maxed, spend 8 heat gain 1 TR. ' +
                        'You may repeat this action like a standard project.', (ab) => {
                        ab.heat(8, { digit: Options_1.digit, size: Size_1.Size.SMALL }).startAction.tr(1, { size: Size_1.Size.SMALL }).text('∞');
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        this.onCorpCardPlayed(player, this);
        return undefined;
    }
    onCorpCardPlayed(player, card) {
        this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name) && card.tags.includes(Tag_1.Tag.VENUS)) {
            player.production.add(Resource_1.Resource.HEAT, 1, { log: true });
        }
    }
    canAct(player) {
        return player.heat >= 8 && player.game.getTemperature() === constants_1.MAX_TEMPERATURE && player.canAfford({ cost: 0, reserveUnits: Units_1.Units.of({ heat: 8 }), tr: { tr: 1 } });
    }
    action(player) {
        player.heat -= 8;
        player.increaseTerraformRating();
        player.defer(() => {
            player.getActionsThisGeneration().delete(this.name);
        });
        return undefined;
    }
}
exports.Ambient = Ambient;
