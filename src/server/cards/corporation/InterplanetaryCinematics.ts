import {Card} from '../Card';
import {ICorporationCard} from './ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IProjectCard} from '../IProjectCard';
import {Player} from '../../Player';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit, played} from '../Options';

export class InterplanetaryCinematics extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.INTERPLANETARY_CINEMATICS,
      tags: [Tag.BUILDING],
      startingMegaCredits: 40,

      behavior: {
        stock: {steel: 12},
      },

      metadata: {
        cardNumber: 'R19',
        description: 'You start with 12 steel and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(40).nbsp.steel(12, {digit});
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you play an event, you gain 3 M€.', (eb) => {
              eb.event({played}).startEffect.megacredits(3);
            });
          });
        }),
      },
    });
  }
  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.isCorporation(this.name) && card.type === CardType.EVENT) {
      player.megaCredits += 3;
    }
  }
}
