import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';


export class EdibleFungi extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 12,
      tags: [Tag.MICROBE],
      name: CardName.EDIBLE_FUNGI,
      type: CardType.AUTOMATED,

      behavior: {
        production: {plants: 2},
      },
      requirements: {tag: Tag.MICROBE, count: 1},

      metadata: {
        cardNumber: 'L403',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(2));
        }),
        description: 'Requires 1 Microbe tag. Increase your Plant production 2 steps.',
      },
    });
  }

}
