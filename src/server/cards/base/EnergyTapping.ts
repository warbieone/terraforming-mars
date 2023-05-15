import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';
import {GainProduction} from '../../deferredActions/GainProduction';
import {CardRequirements} from '../CardRequirements';

export class EnergyTapping extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ENERGY_TAPPING,
      tags: [Tag.POWER],
      cost: 3,
      victoryPoints: -1,

      requirements: CardRequirements.builder((b) => b.generation(4)),

      metadata: {
        cardNumber: '201',
        description: 'Requires that it is Generation 4. Decrease any energy production 1 step and increase your own 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1, {all}).br;
            pb.plus().energy(1);
          });
        }),
      },
    });
  }

  public override bespokePlay(player: Player) {
    player.game.defer(
      new DecreaseAnyProduction(player, Resource.ENERGY, {count: 1, stealing: true}));
    player.game.defer(new GainProduction(player, Resource.ENERGY, {count: 1}));
    return undefined;
  }
}
