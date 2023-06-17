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
import {GainResources} from '../../../deferredActions/GainResources';
import { SpaceType } from '../../../../common/boards/SpaceType';
import {ISpace} from '../../../boards/ISpace';

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

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: ISpace) {
    if (cardOwner.id === activePlayer.id && space.tile?.tileType !== TileType.OCEAN && space.spaceType !== SpaceType.COLONY) {
      cardOwner.game.defer(
        new GainResources(cardOwner, Resource.PLANTS, {
          count: 1,
          cb: () => activePlayer.game.log(
            '${0} gained 1 ${1} from ${2}',
            (b) => b.player(cardOwner).string(Resource.PLANTS).cardName(this.name)),
        }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }

}
