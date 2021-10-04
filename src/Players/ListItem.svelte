<script>
  import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';
  import Close32 from 'carbon-icons-svelte/lib/Close32';
  import Player from '../components/Player.svelte';

  const { ipcRenderer } = require('electron');

  export let player;
  export let addContender;

  let selected = false;

  const toggleSelection = () => {
    selected = !selected;
    addContender(player.id);
  }

  const deletePlayer = () => {
    ipcRenderer.on('deleted-player', event => {
      player = null;
    })
    ipcRenderer.send('delete-player', player.id);
  }
</script>

{#if player}
  <div on:click={toggleSelection} class="player-row" class:selected>
    <div class="player-name">{player.name}</div>
    <div class="player-avatar">
      <Player player={player} />
    </div>
    <div class="player-select">
      {#if selected}
        <Checkmark32 />
      {/if}
    </div>
    <div class="player-delete" on:click={deletePlayer}>
      <Close32 />
    </div>
  </div>
{/if}

<style>
  .player-row {
    position: relative;
    height: 100px;
    cursor: pointer;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-bottom: 1px solid #e6e6e6;
  }

  .player-row.selected {
    background: #e6e6e6;
  }

  .player-row:hover {
    background: var(--aqua);
  }

  .player-row :global(.player-avatar) {
    position: absolute;
    left: 0;
    top: 0;
    transform: scale(0.2);
    transform-origin: top left;
  }

  .player-name {
    margin-left: 100px;
    font-size: 25px;
    font-family: 'Montserrat';
  }

  .player-delete :global(svg) {
    fill: var(--magenta);
  }
</style>