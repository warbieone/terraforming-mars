import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Resource} from '../../../../common/Resource';
import {Player} from '../../../Player';

export class NoMonNoCryInsurance extends Card implements IProjectCard {
  // author: markanarmi
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.NOMON_NOCRY_INSURANCE,
      cost: 2,
      tags: [Tag.EARTH],

      metadata: {
        cardNumber: 'L410',
        renderData: CardRenderer.builder((b) => {
          b.effect('When your production is reduced, any resources are taken from you or one of your delegates is removed, gain 3 M€.', (eb) => {
            eb.minus().production((pb) => pb.wild(1)).slash().wild(1).slash().delegates(1).startEffect.megacredits(3);
          }).br;
          b.production((pb) => pb.megacredits(-1));
        }),
        description: 'Reduce your M€ production 1 step.',
      },
    });
  }

  public override play(player: Player) {
    player.production.add(Resource.MEGACREDITS, -1);
    return undefined;
  }
}
