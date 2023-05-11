import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class IoResearchOutpost extends PreludeCard {
  constructor() {
    super({
      name: CardName.IO_RESEARCH_OUTPOST,
      tags: [Tag.JOVIAN, Tag.SCIENCE],

      behavior: {
        production: {titanium: 1},
        drawCard: 2,
      },

      metadata: {
        cardNumber: 'P16',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1)).br;
          b.cards(2);
        }),
        description: 'Increase your titanium production 1 step. Draw 2 cards.',
      },
    });
  }
}
