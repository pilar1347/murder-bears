
<script>
	import { Router, Route, Link } from 'svelte-routing';
	import Menu24 from 'carbon-icons-svelte/lib/Menu24';
	import Players from './Players/Players.svelte';
	import CreatePlayer from './CreatePlayer.svelte';
	import Home from './Home/Home.svelte';
	import DressPlayer from './DressPlayer.svelte';
	import Battle from './Battle/Battle.svelte';
	// import QuickLink from './QuickLink.svelte';
	import Teddy from './icons/teddy.svg';

	export let url = '';
</script>

<Router url="{url}">
	<main>
		<Route path="home" component={Home} />
		<Route path="players" component="{Players}" />
		<Route path="create" component="{CreatePlayer}" />
		<Route path="dressup/:playerId" component="{DressPlayer}" />
		<Route path="battle/:playerIds" component={Battle} />
		<Route path="*" component="{Home}" />
	</main>
	<header>
		<div class="title"><h1>Murder Bears</h1></div>
		<div class="nav">
			<nav>
				<Link to="players">
					<Teddy class="teddy" />
				</Link>
				<Link to="home"><Menu24 /></Link>
			</nav>
		</div>
	</header>
</Router>

<style>
	main {
		padding: 75px 15px 15px 15px;
		overflow-y: auto;
		height: 100%
	}

	header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		box-shadow: 0px 1px 1px rgba(0, 0,0,0.12);
		display: flex;
		align-items: center;
		padding: 0 15px;
		background: var(--med-blue);
		justify-content: space-between;
		font-family: 'Montserrat', sans-serif;
	}

	header :global(a) {
		flex: 0 1 auto;
		color: var(--aqua);
		fill: var(--aqua);
		text-decoration: none;
		font-weight: 300;
		text-transform: uppercase;
		z-index: 100;
	}

	header :global(a:hover) {
		color: var(--light-aqua);
		fill: var(--light-aqua);
	}

	header :global(.teddy) {
		width: 20px;
		height: 24px;
		margin-right: 5px;
	}

	h1 {
		color: #ffffff;
		font-size: 2em;
		font-weight: 100;
		margin: 0;
	}

</style>