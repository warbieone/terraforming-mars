import {CorporationCard} from './CorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Helion extends CorporationCard {
  constructor() {
    super({
      name: CardName.HELION,
      tags: [Tag.SPACE],
      startingMegaCredits: 40,

      behavior: {
        production: {heat: 4},
      },

      metadata: {
        cardNumber: 'R18',
        description: 'You start with 4 heat production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.heat(4)).nbsp.megacredits(40);
          b.corpBox('effect', (ce) => {
            ce.effect('You may use heat as M€. You may not use M€ as heat.', (eb) => {
              eb.startEffect.text('x').heat(1).equals().megacredits(1, {text: 'x'});
            });
          });
        }),
      },
    });
  }
  public override bespokePlay(player: IPlayer) {
    player.canUseHeatAsMegaCredits = true;
    // player.heatNeededForTemperature = 7;
    return undefined;
  }
}
