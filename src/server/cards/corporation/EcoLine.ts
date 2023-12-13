import {CorporationCard} from './CorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {IPlayer} from '../../../server/IPlayer';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {IProjectCard} from '../IProjectCard';
import {Priority} from '../../deferredActions/DeferredAction';

export class EcoLine extends CorporationCard {
  constructor() {
    super({
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

  public override bespokePlay(player: IPlayer) {
    this.gainBonus(player, 1);
    return undefined;
  }

  private gainBonus(player: IPlayer, amount: number): void {
    for (let i = 0; i < amount; i++) {
          const options = new OrOptions(
        new SelectOption('Gain 2 MC', 'Gain MC')
        .andThen(() => {
          player.megaCredits += 2, {log:true}
          return undefined;
        }),
        new SelectOption('Gain 1 plant', 'Gain plant')
        .andThen(() => {
          player.plants += 1, {log:true}
          return undefined;
        }),
      );
      player.defer(options, Priority.GAIN_RESOURCE_OR_PRODUCTION);
    }
    return undefined;
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (player.isCorporation(this.name)){
      const amount = card.tags.filter((tag) => tag === Tag.ANIMAL || tag === Tag.PLANT || tag === Tag.MICROBE).length;
      if (amount > 0) {
        this.gainBonus(player, amount);
      }
   }
  }

  }
