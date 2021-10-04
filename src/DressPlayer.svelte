<script>
  import ArrowLeft24 from 'carbon-icons-svelte/lib/ArrowLeft24';
  import ArrowRight24 from 'carbon-icons-svelte/lib/ArrowRight24';
  import { navigate } from 'svelte-routing';
  import Player from './components/Player.svelte';

  const { ipcRenderer } = require('electron');

  export let playerId;

  let player = null;

  const clothes = {
    shirts: [
      { id: '1', url: 'shirt-1.PNG', name: 'carvana' },
      { id: '2', url: 'shirt-2.PNG', name: 'nirvana' },
      { id: '3', url: 'shirt-3.PNG', name: 'hawaii' },
      { id: '4', url: 'shirt-4.PNG', name: 'tiedye' },
      { id: '5', url: 'shirt-5.PNG', name: 'bikini' }
    ],
    weapons: [
      { id: '1', url: 'weapon-1.PNG', name: 'hammer' },
      { id: '2', url: 'weapon-2.PNG', name: 'knife' },
      { id: '3', url: 'weapon-3.PNG', name: 'mace' },
      { id: '4', url: 'weapon-4.PNG', name: 'axe' }
    ],
    pants: [
      { id: '1', url: 'pants-1.PNG', name: 'diaper' },
      { id: '2', url: 'pants-2.PNG', name: 'khakis' },
      { id: '3', url: 'pants-3.PNG', name: 'jeans' },
      { id: '4', url: 'pants-4.PNG', name: 'kilt' }
    ]
  };

  ipcRenderer.on('got-player', (event, playerData) => {
    player = {
      ...playerData._doc,
      shirt: { left: 0 },
      weapon: { left: 0 },
      pant: { left: 0 }
    }
  })
  ipcRenderer.send('get-player', playerId);

  const nextItem = type => {
    if (type === 'shirt') {
      player.shirt.left -= 500;
    } else if (type === 'weapon') {
      player.weapon.left -= 500;
    } else {
      player.pant.left -= 500;
    }
  };

  const prevItem = type => {
    if (type === 'shirt') {
      player.shirt.left += 500;
    } else if (type === 'weapon') {
      player.weapon.left += 500;
    } else {
      player.pant.left += 500;
    }
  }

  const getIndexFromLeft = left => {
    return Math.abs(left / 500);
  }

  const updatePlayer = () => {
    ipcRenderer.on('player-updated', (event, arg) => {
      navigate('/players');
    })
    ipcRenderer.send('update-player', { 
      ...player,
      shirt: {
        left: player.shirt.left,
        name: clothes.shirts[getIndexFromLeft(player.shirt.left)].name
      },
      weapon: {
        left: player.weapon.left,
        name: clothes.weapons[getIndexFromLeft(player.weapon.left)].name
      },
      pant: {
        left: player.pant.left,
        name: clothes.pants[getIndexFromLeft(player.pant.left)].name
      }
    });
  }
</script>

<h1>Dress {player ? player.name : 'me'}!</h1>
<Player player={player} />

<div class="controls prev-controls">
  <button on:click={() => prevItem('shirt')}><ArrowLeft24 />&nbsp;Shirt</button>
  <button on:click={() => prevItem('weapon')}><ArrowLeft24 />&nbsp;Weapon</button>
  <button on:click={() => prevItem('pant')}><ArrowLeft24 />&nbsp;Pants</button>
</div>

<div class="controls next-controls">
  <button on:click={() => nextItem('shirt')}>Shirt&nbsp;<ArrowRight24 /></button>
  <button on:click={() => nextItem('weapon')}>Weapon&nbsp;<ArrowRight24 /></button>
  <button on:click={() => nextItem('pant')}>Pants&nbsp;<ArrowRight24 /></button>
</div>

<button class="action save-player" on:click={updatePlayer}>Save</button>

<style>
  .controls {
    width: 200px;
    position: absolute;
    top: 200px;
  }

  .controls > button {
    margin-bottom: 20px;
  }

  .prev-controls {
    left: 0;
  }

  .next-controls {
    right: 0;
  }

  .next-controls > button {
    justify-content: flex-end;
  }

  :global(button.action) {
    background: var(--magenta);
    text-transform: uppercase;
    padding: 10px 20px;
    font-size: 20px;
    justify-content: center;
  }

  :global(button.action:hover) {
    background: var(--dark-magenta);
  }

  .save-player {
    width: 200px;
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
</style>