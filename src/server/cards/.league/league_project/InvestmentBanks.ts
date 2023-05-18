import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class InvestmentBanks extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 12,
      name: CardName.INVESTMENT_BANKS,
      type: CardType.AUTOMATED,

      behavior: {
        production: {megacredits: 4},
      },

      metadata: {
        cardNumber: 'L409',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(4));
        }),
        description: 'Increase your M€ production 4 steps.',
      },
    });
  }
}
