import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Priority, SimpleDeferredAction} from '../../../deferredActions/DeferredAction';
import { OrOptions } from '../../../../server/inputs/OrOptions';
import { SelectOption } from '../../../../server/inputs/SelectOption';
import {SelectCard} from '../../../inputs/SelectCard';
import {IPlayer} from '../../../IPlayer';


export class OuterRimUniversity extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.OUTER_RIM_UNIVERSITY,
      tags: [Tag.JOVIAN],
      cost: 10,

      victoryPoints: 1,

      metadata: {
        cardNumber: 'L418',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a Jovian tag, including this, you may discard a card from hand to draw a card.', (eb) => {
            eb.jovian().startEffect.minus().cards(1).nbsp.plus().cards(1);
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    const jovianTags = player.tags.cardTagCount(card, Tag.JOVIAN);
    for (let i = 0; i < jovianTags; i++) {
      player.game.defer(new SimpleDeferredAction(
        player,
        () => {
          // No card to discard
          if (player.cardsInHand.length === 0) {
            return undefined;
          }
          return new OrOptions(
            new SelectCard('Select a card to discard', 'Discard', player.cardsInHand, ([card]) => {
              player.cardsInHand.splice(player.cardsInHand.indexOf(card), 1);
              player.game.projectDeck.discard(card);
              player.game.log('${0} is using their ${1} effect to draw a card by discarding a card.', (b) => b.player(player).card(this));
              player.game.log('You discarded ${0}', (b) => b.card(card), {reservedFor: player});
              player.drawCard();
              return undefined;
            }),
            new SelectOption('Do nothing', 'Confirm', () => {
              return undefined;
            }),
          );
        },
      ),
      Priority.DISCARD_AND_DRAW);
    }
    return undefined;
  }
}
