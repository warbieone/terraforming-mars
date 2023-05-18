import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';
import {Player} from '../../../Player';

export class Incinerator extends Card implements IProjectCard {
  // author: ThreadPacifist
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.INCINERATOR,
      cost: 8,
      tags: [Tag.BUILDING],

      requirements: CardRequirements.builder((b) => b.oxygen(5)),
      
      metadata: {
        cardNumber: 'L303',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.plants(1).startAction.heat(6);
          }).br;
        }),
        description: 'Spend 1 plant to gain 6 heat.',
      },
    });
  }

  public canAct(player: Player): boolean {
    return player.plants > 0;
  }

  public action(player: Player) {
    player.plants -= 1;
    player.heat += 6;
    return undefined;
  }
}
