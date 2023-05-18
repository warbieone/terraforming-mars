import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class AssemblyLines extends Card implements IProjectCard {
  constructor() {
    super({

      type: CardType.AUTOMATED,
      name: CardName.ASSEMBLY_LINES,
      tags: [Tag.BUILDING],
      cost: 7,

      behavior: {
        production: {megacredits: 2},
      },

      metadata: {
        cardNumber: 'L404',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2));
        }),
        description: 'Increase your M€ production 2 steps.',
      },
    });
  }

}
