import {CorporationCard} from './CorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';
import {Resource} from '../../../common/Resource';

export class InterplanetaryCinematics extends CorporationCard {
  constructor() {
    super({
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
              eb.tag(Tag.EVENT).startEffect.megacredits(3); 
            });
          });
        }),
      },
    });
  }
  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (player.isCorporation(this.name) && card.type === CardType.EVENT) {
      player.stock.add(Resource.MEGACREDITS, 3, {log: true, from: this});
    }
  }
}
