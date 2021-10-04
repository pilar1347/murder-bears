<script>
  import { Link } from 'svelte-routing';
  import PlayerList from './PlayerList.svelte';
  import Add24 from 'carbon-icons-svelte/lib/Add24';

  const { ipcRenderer } = require('electron');

  let players = [];

  ipcRenderer.on('got-all-players', (event, playersData) => {
    players = playersData;
  })
  ipcRenderer.send('get-all-players');
</script>

<h1>Choose your contenders</h1>
<PlayerList players={players.map(p => p?._doc)} />
<Link to="create"><button><Add24 /><div>Add Player</div></button></Link>

<style>
	:global(button) {
    width: 100%;
    border: 1px solid white;
    background: var(--med-blue);
    color: var(--light-aqua);
    fill: var(--light-aqua);
    padding: 5px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 3px;
  }

  :global(button:disabled) {
    opacity: 0.5;
    background: gray;
    cursor: not-allowed;
  }

  :global(button:disabled:hover) {
    background: gray;
    opacity: 0.5;
  }

  :global(button:hover) {
    opacity: 0.86;
  }

  :global(button:active) {
    background: var(--med-blue);
    text-decoration: none;
  }
</style>