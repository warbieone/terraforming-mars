import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {Card} from '../../Card';
import {CardType} from '../../../../common/cards/CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Resource} from '../../../../common/Resource';
import {PlaceOceanTile} from '../../../deferredActions/PlaceOceanTile';

export class WorldGovernmentPartnership extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.WORLD_GOVERNMENT_PARTNERSHIP,
      tags: [Tag.EARTH, Tag.SPACE],
      cost: 28,

      metadata: {
        description: 'Raise temperature 1 step, raise oxygen 1 step and place an ocean tile. Remove up to 3 plants from EACH opponent.',
        cardNumber: 'L412',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).oxygen(1).oceans(1).br;
          b.minus().plants(-3).asterix();
        }),
      },
    });
  }

  public override play(player: Player) {
    player.game.increaseTemperature(player, 1);
    player.game.increaseOxygenLevel(player, 1);
    player.game.defer(new PlaceOceanTile(player));

    const candidates = player.game.getPlayers().filter((p) => p.id !== player.id && !p.plantsAreProtected() && p.plants > 0);
    candidates.forEach((p) => {
      p.deductResource(Resource.PLANTS, 3, {log: true, from: player});
      return undefined;
    });
    return undefined;
  }
}
