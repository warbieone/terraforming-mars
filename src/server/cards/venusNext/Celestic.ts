import {ICorporationCard} from '../corporation/ICorporationCard';
import {IPlayer} from '../../IPlayer';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {IActionCard} from '../ICard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';
import {LogHelper} from '../../LogHelper';
import {SelectCard} from '../../inputs/SelectCard';
import {ICard} from '../ICard';
import {Card} from '../Card';
import {Player} from '../../Player';



export class Celestic extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      name: CardName.CELESTIC,
      tags: [Tag.VENUS],
      startingMegaCredits: 42,
      resourceType: CardResource.FLOATER,
      type: CardType.CORPORATION,
      initialActionText: 'Draw 2 cards with a floater icon on it',
      victoryPoints: {resourcesHere: {}, per: 3},

/*       action: {
        addResourcesToAnyCard: {
          type: CardResource.FLOATER,
          count: 1,
          autoSelect: true,
        },
      }, */

      metadata: {
        cardNumber: 'R05',
        description: 'You start with 42 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a floater icon on it. Take them into hand and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(42).nbsp.cards(2, {secondaryTag: AltSecondaryTag.FLOATER});
          b.corpBox('action', (ce) => {
            ce.action('Action: Add a floater each to 1 or 2 different cards. 1 VP per 3 floaters on this card.', (eb) => {
              eb.empty().startAction.floaters(1).asterix().floaters(1).asterix();
            });
            ce.vSpace(); // to offset the description to the top a bit so it can be readable
          });
        }),
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    const floaterCards = player.getResourceCards(CardResource.FLOATER);
    if (floaterCards.length === 1) {
      player.addResourceTo(this, 1);
      LogHelper.logAddResource(player, floaterCards[0]);
      return undefined;
    }

    if (floaterCards.length === 2) {
      player.addResourceTo(floaterCards[0], 1);
      LogHelper.logAddResource(player, floaterCards[0]);
      player.addResourceTo(floaterCards[1], 1);
      LogHelper.logAddResource(player, floaterCards[1]);
      return undefined;
    }

    return new SelectCard(
      'Select 2 different cards to add 1 floater each',
      'Add floaters',
      floaterCards,
      (foundCards: Array<ICard>) => {
        foundCards.forEach((floaterCard) => {
          player.addResourceTo(floaterCard, {qty: 1, log: true});
        });
        return undefined;
      },
      { max: 2, min: 2 },
    );
  }


  // Public for testing
  public static readonly floaterCards: Set<CardName> = new Set([
    // Venus
    CardName.AEROSPORT_TOURNAMENT,
    CardName.AIR_SCRAPPING_EXPEDITION,
    CardName.ATMOSCOOP,
    CardName.HYDROGEN_TO_VENUS,
    CardName.STRATOSPHERIC_BIRDS,

    // Colonies
    CardName.AIRLINERS,
    CardName.AIR_RAID,
    CardName.FLOATER_LEASING,
    CardName.FLOATER_PROTOTYPES,
    CardName.FLOATER_TECHNOLOGY,
    CardName.NITROGEN_FROM_TITAN,

    // // Pathfinders
    CardName.CASSINI_STATION,
    CardName.FLOATER_URBANISM,
    CardName.NOBEL_LABS,
    CardName.SECRET_LABS,
    CardName.VENERA_BASE,
  ]);

  public initialAction(player: IPlayer) {
    player.drawCard(2, {
      include: (card) => Celestic.floaterCards.has(card.name) || card.resourceType === CardResource.FLOATER,
    });
    return undefined;
  }
}
