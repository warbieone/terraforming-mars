import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';

export class Poseidon extends CorporationCard {
  constructor() {
    super({
      name: CardName.POSEIDON,
      startingMegaCredits: 40,

      firstAction: {
        text: 'Place a colony',
        // title: 'Poseidon first action - Select where to build colony
        colonies: {buildColony: {}},
      },
      metadata: {
        cardNumber: 'R02',
        description: 'You start with 40 M€. As your first action, place a colony.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(45).nbsp.colonies(1);
          b.corpBox('effect', (ce) => {
            ce.effect('When anyone plays a colony, including this, raise your M€ production 1 step.', (eb) => {
              eb.colonies(1).startEffect.production((pb) => pb.megacredits(1));
            });
          });
        }),
      },
    });
  }

  public onColonyAdded(player: IPlayer, cardOwner: IPlayer) {
    if (player === cardOwner) {
      player.production.add(Resource.MEGACREDITS, 1, {log: true});
    }
  }
}
