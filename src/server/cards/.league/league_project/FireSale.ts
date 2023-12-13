import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {max} from '../../Options';
import {Resource} from '../../../../common/Resource';
import {IPlayer} from '../../../../server/IPlayer';

export class FireSale extends Card implements IProjectCard {
  // author: markanarmi
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.FIRE_SALE,
      tags: [Tag.EARTH],
      cost: 3,

      requirements: {temperature: 6, max},
      
      metadata: {
        cardNumber: 'L301',
        // TODO: Find prettier layout
        renderData: CardRenderer.builder((b) => {
          b.text('-X').heat(1).nbsp.text('+').megacredits(0);
        }),
        description: 'Convert all heat to M€.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.stock.add(Resource.MEGACREDITS, player.heat, {log: true});
    return player.spendHeat(player.heat);
  }
}

