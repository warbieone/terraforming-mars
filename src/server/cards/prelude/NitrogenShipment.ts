import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class NitrogenShipment extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NITROGEN_SHIPMENT,

      behavior: {
        tr: 2,
        stock: {plants: 5},
      },

      metadata: {
        cardNumber: 'P24',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).br;
          b.plants(5);
        }),
        description: 'Increase your TR 2 step. Gain 5 plants.',
      },
    });
  }
}
