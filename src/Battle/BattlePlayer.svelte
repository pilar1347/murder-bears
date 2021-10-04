<script>
  import Player from '../components/Player.svelte';

  export let player;
  export let isTurn;
  export let doAttack;
  export let life;

  let attacking = false;

  const fireAttack = () => {
    attacking = true;
    doAttack();
    setTimeout(() => {
      attacking = false;
    }, 1000);
  }
</script>

<div class="player-block">
  <div class="life-num">{life}% Health</div>
  <div class="life-blood">
    <div class="life-meter" style="width: {life}%"></div>
  </div>
  <div class="player-avatar" class:attacking class:dead={life === 0}>
    <Player player={player} life={life} />
  </div>
  <button class="action" disabled={!isTurn} on:click={fireAttack}>Attack</button>
</div>

<style>
.player-block {
  width: 400px;
  height: 400px;
}

.player-avatar :global(.player) {
  transform: scale(0.8);
  transform-origin: top left;
}

.player-avatar.attacking {
  animation: shake 0.5s;
}

.player-avatar.dead {
  animation: die 3s;
  animation-fill-mode: forwards;
}

@keyframes die {
  0% { transform: translate(3px, 3px) rotate(0deg); }
  10% { transform: translate(-3px, -3px) rotate(-5deg); }
  20% { transform: translate(-5px, 0px) rotate(5deg); }
  30% { transform: translate(5px, 5px) rotate(0deg); }
  40% { transform: translate(6px, -8px) rotate(5deg); }
  50% { transform: translate(-18x, 6px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(90deg); }
}

button {
  justify-content: center;
  font-size: 20px;
}

.life-blood {
  width: 100%;
  border-radius: 10px;
  height: 20px;
  background: white;
  border: 1px solid black;
  overflow: hidden;
  margin-bottom: 20px;
}

.life-meter {
  background: #b01605;
  height: 100%;
}
</style>