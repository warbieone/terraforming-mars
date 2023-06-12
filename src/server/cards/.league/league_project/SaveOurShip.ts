import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {DiscardCards} from '../../../deferredActions/DiscardCards';
import {DrawCards} from '../../../deferredActions/DrawCards';
import {IPlayer} from '../../../../server/IPlayer';


export class SaveOurShip extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.SAVE_OUR_SHIP,
      cost: 0,

      victoryPoints: -1,

      metadata: {
        cardNumber: 'L419',
        description: 'Discard 2 cards, then draw 3 cards.',
        renderData: CardRenderer.builder((b) => {
          b.minus().cards(2).br;
          b.plus().cards(3);
        }),
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer): boolean {
    // Only playable if you have 2 cards to discard + this card in hand
    return super.canPlay(player) && player.cardsInHand.length > 2;
  }

  public override bespokePlay(player: IPlayer) {
    player.game.defer(new DiscardCards(player, 2));
    player.game.defer(DrawCards.keepAll(player, 3));
    return undefined;
  }
}
