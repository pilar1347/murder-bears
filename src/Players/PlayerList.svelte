<script>
  import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';
  import { navigate } from 'svelte-routing';
  import ListItem from './ListItem.svelte';
  import Teddy from '../icons/teddy.svg';

  export let players;

  let contenders = [];

  const addContender = id => {
    contenders = contenders.filter(x => x.id !== id);
    contenders = [...contenders, id];
  }

  const getPlayerNames = () => {
    const names = players.filter(x => contenders.includes(x.id)).map(x => x.name);
    return names.join(' vs ');
  }

  const startBattle = () => {
    navigate(`/battle/${contenders.join('_')}`);
  }
</script>

<div id="list-wrapper">
  {#each players as player}
    <ListItem player={player} addContender={addContender} />
  {/each}
</div>
{#if contenders.length === 2}
  <div class="marquee-wrap">
    <div class="marquee">
      <Teddy class="teddy"/>&nbsp;
      {getPlayerNames()}&nbsp;
      <Teddy class="teddy" />
    </div>    
  </div>
  <button class="action" on:click={startBattle}>Battle!!</button>
{/if}

<style>
  #list-wrapper {
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  button {
    margin: 15px 0;
  }

  .marquee-wrap {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .marquee {
    text-transform: uppercase;
    font-size: 20px;
    text-align: center;
    font-family: 'Montserrat';
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .marquee :global(svg) {
    width: 20px;
    height: 30px;
    fill: var(--med-blue);
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }
</style>