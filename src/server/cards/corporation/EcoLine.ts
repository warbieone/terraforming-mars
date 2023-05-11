import {Card} from '../Card';
import {ICorporationCard} from './ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {Player} from '../../Player';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {IProjectCard} from '../IProjectCard';

export class EcoLine extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.ECOLINE,
      tags: [Tag.PLANT],
      startingMegaCredits: 37,

      behavior: {
        production: {plants: 3},
      },

      metadata: {
        cardNumber: 'R17',
        description: 'You start with 3 plant production, and 37 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.plants(3)).nbsp.megacredits(37);
          b.corpBox('effect', (ce) => {
            ce.effect('Each time you play a plant, animal or microbe tag, including this, gain 2MC or 1 plant.', (eb) => {
              eb.animals(1,{played}).slash().plants(1,{played}).slash().microbes(1,{played});
              eb.startEffect.megacredits(2).or().plants(1)
            });
          });
        }),
      },
    });
  }

  private gainBonus(player: Player, amount: number) {
    for (let i = 0; i < amount; i++) {
      const addCredits = new SelectOption('Gain 2 MC', 'Gain MC', () => {
        player.megaCredits += 2, {log:true}
        return undefined;
      });
  
      const addPlant = new SelectOption('Gain 1 plant', 'Gain plant', () => {
        player.plants += 1, {log:true}
        return undefined;
      });
      return new OrOptions(addCredits, addPlant);
    }
    return undefined;
  }

  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.isCorporation(this.name)){
      const amount = card.tags.filter((tag) => tag === Tag.ANIMAL || tag === Tag.PLANT || tag === Tag.MICROBE).length;
      if (amount > 0) {
        this.gainBonus(player, amount);
      }
   }
  }

  }
