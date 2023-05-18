import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class BankUnions extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.BANK_UNIONS,
      tags: [Tag.BUILDING],
      cost: 8,

      behavior: {
        production: {megacredits: 2},
      },

      metadata: {
        cardNumber: 'L405',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3));
        }),
        description: 'Increase your M€ production 3 steps.',
      },
    });
  }

}
