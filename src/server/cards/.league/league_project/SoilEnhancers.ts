import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {IPlayer} from '../../../IPlayer';
import { TileType } from '../../../../common/TileType';
import { Resource } from '../../../../common/Resource';
import {Priority} from '../../../deferredActions/DeferredAction';
import { SpaceType } from '../../../../common/boards/SpaceType';
import {Space} from '../../../boards/Space';
import { GainStock } from '../../../../server/deferredActions/GainStock';
import {Units} from '../../../../common/Units';

export class SoilEnhancers extends Card implements IProjectCard {
  // hodgepodge
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SOIL_ENHANCERS,
      tags: [Tag.MICROBE],
      cost: 7,

      metadata: {
        description: 'Every time you place a non-ocean tile ON MARS, gain 1 plant.',
        cardNumber: 'L420',
        renderData: CardRenderer.builder((b) => {
          b.effect(undefined, (be) => be.emptyTile().asterix().startEffect.plants(1)).br;
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space) {
    const game = cardOwner.game;
    if (cardOwner.id === activePlayer.id && space.tile?.tileType !== TileType.OCEAN && space.spaceType !== SpaceType.COLONY) {
      game.defer(
        new GainStock(cardOwner, Units.of({plants: 1}), {
          cb: () => game.log(
            '${0} gained 1 ${1} from ${2}',
            (b) => b.player(cardOwner).string(Resource.PLANTS).cardName(this.name)),
        }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }

}
