<script>
  import { navigate } from 'svelte-routing';
  import BattlePlayer from './BattlePlayer.svelte';

  const { ipcRenderer } = require('electron');

  export let playerIds = '';

  let players = [];
  let fightLog = [];
  let turn = Math.round(Math.random());
  let life = [100, 100];
  let battleWinner = null;
  let battleLoser = null;

  ipcRenderer.on('got-battle-players', (event, playersData) => {
    players = playersData.map(x => x._doc);
  })
  ipcRenderer.send('get-battle-players', playerIds.split('_'));

  const attacks = [
    { points: 5, log: '{a} slapped {b}.' },
    { points: 10, log: '{a} punched {b} in the FACE!' },
    { points: 15, log: '{a} body-slammed {b}!'},
    { points: 15, log: '{a} purple-nurpled {b}!'},
    { points: 10, log: '{a} pistol whipped {b}!'},
    { points: 15, log: '{a} gave {b} a serious nuggie!'},
    { points: 10, log: '{a} gave {b} an atomic wedgie!'},
    { points: 20, log: '{a} shivved {b} in the gut!'},
    { points: 20, log: '{a} sliced off {b}\'s finger!'},
    { points: 20, log: '{a} poked {b}\'s eye out!'},
    { points: 25, log: '{a} cut off {b}\'s arm!'},
    { points: 25, log: '{a} cut off {b}\'s leg!'}
  ];

  const doAttack = () => {
    const { log, points } = attacks[Math.floor(Math.random() * attacks.length)];
    const defenderInd = Math.abs(turn - 1);

    const attacker = players[turn];
    const defender = players[defenderInd];

    const logString = log.replace('{a}', attacker.name).replace('{b}', defender.name);
    fightLog = [...fightLog, `${logString} ${points} POINTS`];
    life[defenderInd] = Math.max(life[defenderInd] - points, 0);

    if (life[defenderInd] === 0) {
      setTimeout(() => {
        battleWinner = attacker.name;
        battleLoser = defender.name;
      }, 3000);
    }

    turn = defenderInd;
  }

  const backToPlayers = () => {
    navigate('/players');
  }
</script>

<h1>Battle</h1>
<div class="battle-cage">
  <BattlePlayer player={players[0]} isTurn={turn === 0} doAttack={doAttack} life={life[0]} />
  <div class="fight-log">
    {#each fightLog as log}
      <p>{log}</p>
    {/each}
  </div>
  <BattlePlayer player={players[1]} isTurn={turn === 1} doAttack={doAttack} life={life[1]} />
</div>
{#if battleWinner}
  <div id="overlay">
    <div id="modal">
      <p>{battleWinner} murdered {battleLoser}</p>
      <button class="action" on:click={backToPlayers}>So sad</button>
    </div>
  </div>
{/if}

<style>
  #overlay {
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }

  #modal {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: var(--light-aqua);
    border-radius: 4px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
    text-align: center;
    padding: 25px 50px;
  }

  .battle-cage {
    display: flex;
    justify-content: space-between;
  }

  .fight-log {
    font-size: 16px;
    padding: 0 15px;
  }
</style>