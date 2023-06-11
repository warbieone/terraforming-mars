import {Player} from '../../Player';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {PreludeCard} from './PreludeCard';
import {PlayProjectCard} from '../../deferredActions/PlayProjectCard';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

export class EccentricSponsor extends PreludeCard {
  constructor() {
    super({
      name: CardName.ECCENTRIC_SPONSOR,

      metadata: {
        cardNumber: 'P11',
        renderData: CardRenderer.builder((b) => {
          b.text('Play a card from hand, reducing its cost by 27 M€', Size.SMALL, true);
        }),
      },
    });
  }
  public override getCardDiscount(player: IPlayer) {
    if (player.lastCardPlayed === this.name) {
      return 27;
    }
    return 0;
  }

  public override bespokePlay(player: Player) {
    player.game.defer(new PlayProjectCard(player));
    return undefined;
  }
}
