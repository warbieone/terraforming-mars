import {Card} from '../Card';
import {IActionCard} from '../ICard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {ICorporationCard} from './ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';

export const ACTION_COST = 1;
export class UnitedNationsMarsInitiative extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.UNITED_NATIONS_MARS_INITIATIVE,
      tags: [Tag.EARTH],
      startingMegaCredits: 50,

      metadata: {
        cardNumber: 'R32',
        description: 'You start with 50 M€.',
        renderData: CardRenderer.builder((b) => {
          // TODO(chosta): find a not so hacky solutions to spacing
          b.br.br.br;
          b.empty().nbsp.nbsp.nbsp.nbsp.megacredits(40);
          b.corpBox('action', (ce) => {
            ce.action('If your Terraform Rating was raised this generation, you may pay 1 M€ to raise it 1 step more.', (eb) => {
              eb.megacredits(1).startAction.tr(1).asterix();
            });
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.hasIncreasedTerraformRatingThisGeneration && player.canAfford(ACTION_COST, {tr: {tr: 1}});
  }
  public action(player: IPlayer) {
    player.payMegacreditsDeferred(
      1,
      'Select how to pay for UNMI action.',
      () => player.increaseTerraformRating());
    return undefined;
  }
}
