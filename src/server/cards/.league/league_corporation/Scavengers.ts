/* import {Card} from '../../Card';
import {IPlayer} from '../../../../server/IPlayer';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import { ICorporationCard } from '../../corporation/ICorporationCard';
import {TileType} from '../../../../common/TileType';
import {ISpace} from '../../../boards/ISpace';
import {SelectSpace} from '../../../inputs/SelectSpace';
// import {Resources} from '../../../Resources';
// import {SelectScavengersStartingProd} from '../../../deferredActions/SelectScavengersStartingProd';

export class Scavengers extends Card implements ICorporationCard {
  // burner
  // SCAVENGERS TilePlacement hook in Game.grantSpaceBonus()
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.SCAVENGERS,
      startingMegaCredits: 46,
      initialActionText: 'Place the crashed space ship tile on mars',

      metadata: {
        cardNumber: 'L421',
        // description: 'You start with 46 M€ and 1 of every other resource. Choose 2 different production types. As your first action, place the crashed space ship tile on mars.',
        description: 'You start with 46 M€ and 1 of every other resource. As your first action, place the crashed space ship tile on mars.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(46).wild(1).tile(TileType.SCAVENGERS, true);
          // b.megacredits(46).production((pb) => pb.megacredits(-3).wild(2)).wild(1).tile(TileType.SCAVENGERS, true);
          b.corpBox('effect', (ce) => {
            ce.effect('When you place a standard (non ocean) tile on mars, gain an additional bonus of each type printed on the tile.', (eb) => {
              eb.text('n').wild(1).startEffect.text('(n+1)').wild(1);
            });
          });
        }),
      },
    });
  }

  public initialAction(player: IPlayer) {
    return new SelectSpace(
      'Select space for Scavengers tile',
      player.game.board.getAvailableSpacesOnLand(player),
      (space: ISpace) => {
        player.game.addTile(player, space, {
          tileType: TileType.SCAVENGERS,
          card: this.name,
        });
        return undefined;
      },
    );
  }

  public override bespokePlay(player: IPlayer) {
    // player.addProduction(Resources.MEGACREDITS, -3);
    player.steel++;
    player.titanium++;
    player.plants++;
    player.energy++;
    player.heat++;
    // player.game.defer(new SelectScavengersStartingProd(player));
    return undefined;
  }
}
 */