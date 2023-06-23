import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';
import {Player} from '../../Player';


export class SocietySupport extends PreludeCard {
  constructor() {
    super({
      name: CardName.SOCIETY_SUPPORT,
      tags: [Tag.WILD],

      startingMegacredits: -2,

      behavior: {
        production: {plants: 1, energy: 1, heat: 1},
      },

      metadata: {
        cardNumber: 'P31',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.plants(1).energy(1).heat(1);
            b.megacredits(-2);
          });
        }),
        description: 'Increase your plant, energy and heat production 1 step. Pay 3 M€.',
      },
    });
  }
  public override bespokeCanPlay(player: Player) {
    return player.canAfford(3);
  }
  public override bespokePlay(player: Player) {
    player.game.defer(new SelectPaymentDeferred(player, 3));
    return undefined;
  }
}
