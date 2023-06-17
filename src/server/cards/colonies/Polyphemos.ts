import {ICorporationCard} from '../corporation/ICorporationCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';
import {IPlayer} from '../../IPlayer';
import {IProjectCard} from '../IProjectCard';


export class Polyphemos extends Card implements ICorporationCard {
  constructor() {
    super({
      name: CardName.POLYPHEMOS,
      startingMegaCredits: 55,
      type: CardType.CORPORATION,
      cardCost: 5,

      behavior: {
        production: {megacredits: 5},
        stock: {titanium: 5},
      },

      metadata: {
        cardNumber: 'R11',
        description: 'You start with 55 M€. Increase your M€ production 5 steps. Gain 5 titanium.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(55).nbsp.production((pb) => pb.megacredits(5)).nbsp.titanium(5, {digit});
          b.corpBox('effect', (ce) => {
            ce.effect('When you buy a card to hand, pay 5M€ instead of 3, including the starting hand.', (eb) => {
              eb.cards(1).asterix().startEffect.megacredits(5);
            });
            ce.effect('When playing a card with a basic cost of 20MC or more, draw a card.', (eb) => {
              eb.megacredits(20).asterix().startEffect.cards(1);
            });
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
        if (player.isCorporation(this.name) && card.cost >= 20) {
      player.drawCard();
    }
  }

}
