<script>
  export let player;
  export let life = 100;

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
</script>

{#if player}
  <div class="player">
    <img src={player.image} alt="player face" class="player-face" />
    <div class="bear-image"></div>
    <div class="carousel" id="shirt-carousel" style="left:{player.shirt.left}px">
      {#each clothes.shirts as shirt}
        <div><img src="./assets/{shirt.url}" alt="shirt{shirt.id}" /></div>  
      {/each}
    </div>

    <div class="carousel" id="weapon-carousel" style="left:{player.weapon.left}px">
      {#each clothes.weapons as weapon}
        <div><img src="./assets/{weapon.url}" alt="weapon{weapon.id}" /></div>  
      {/each}
    </div>

    <div class="carousel" id="pant-carousel" style="left:{player.pant.left}px">
      {#each clothes.pants as pant}
        <div><img src="./assets/{pant.url}" alt="pant{pant.id}" /></div>  
      {/each}
    </div>
    {#if life < 50}
      <img class="blood small" src="./assets/blood-small.PNG" alt="small ouchie" />
    {/if}
    {#if life < 25}
      <img class="blood big" src="./assets/blood-big.PNG" alt="big ouchie" />
    {/if}
    {#if life < 1}
      <img class="dead-eyes" src="./assets/dead.png" alt="dead eyes" />
    {/if}
  </div>
{/if}

<style>
  .blood, .dead-eyes {
    width: 1000px;
    position: absolute;
  }

  .dead-eyes {
    left: -30px;
    top: -100px;
  }

  .blood.small {
    top: -100px;
    left: -520px;
    transform: rotate(90deg);
  }

  .blood.big {
    top: 0;
    left: -50px;
  }

  .player {
    margin: 0 auto;
    position: relative;
    width: 500px;
    height: 500px;
    overflow: hidden;
  }

  .bear-image {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url('../assets/bear.PNG');
    background-position: -30px -100px;
    background-repeat: no-repeat;
    background-size: 1000px;
  }

  .player-face {
    position: absolute;
    width: 150px;
    height: 150px;
    left: 173px;
    top: 25px;
  }

  .carousel {
    white-space: nowrap;
    position: absolute;
    width: auto;
    transition: left 0.3s linear;
  }

  .carousel > div {
    width: 500px;
    height: 150px;
    display: inline-block;
    overflow: hidden;
    position: relative;
  }

  .carousel img {
    width: 1000px;
    position: absolute;
    top: -250px;
    left: -30px;
  }

  #shirt-carousel {
    top: 150px;
  }

  #weapon-carousel {
    top: 10px;
  }

  #weapon-carousel > div {
    height: 260px;
  }

  #weapon-carousel img {
    top: -110px;
  }

  #pant-carousel {
    top: 280px;
  }

  #pant-carousel img {
    top: -380px;
  }
</style>