<script>
  import Dropzone from 'svelte-file-dropzone';
  import ArrowRight24 from 'carbon-icons-svelte/lib/ArrowRight24';
  import { navigate } from 'svelte-routing';

  const fs = require('fs');
  const path = require('path');
  const { ipcRenderer } = require('electron');

  let file = null;
  let imagePath = '';
  let name = '';

  const handleFilesSelect = (e) => {
    const { acceptedFiles } = e.detail;
    file = acceptedFiles[0];

    fs.readFile(file.path, (e, data) => {
      imagePath = path.join(__dirname, '/uploads', file.name);
      fs.writeFile(imagePath, data, (err) => {
        if (err) throw err;
        console.log('saved file');
      });
    })
  }

  const savePlayerDataAndContinue = async ev => {
    ev.preventDefault();
    console.log('save', name, file.path);

    ipcRenderer.on('player-saved', (event, arg) => {
      console.log('player saved to db!', arg);
      navigate(`/dressup/${arg}`);
    })
    ipcRenderer.send('create-player', { name, image: imagePath });
  }
</script>

<h1>Build a Beast</h1>
<div class="form-wrapper">
  <form>
    <fieldset>
      <label for="name">Name</label>
      <input id="name" type="text" bind:value={name} />
    </fieldset>
    <fieldset>
      {#if file}
        <img src="{file.path}" alt="{file.name}" />
      {:else}
        <Dropzone on:drop={handleFilesSelect} multiple={false} accept="image/*" />
      {/if}
    </fieldset>
    <button class="action" on:click={savePlayerDataAndContinue}>Next&nbsp;<ArrowRight24 /></button>
  </form>
</div>

<style>
	:global(h1) {
    color: var(--dark-magenta);
    font-family: 'Montserrat';
    text-transform: uppercase;
    margin: 0 0 15px;
    text-align: center;
  }

  .form-wrapper {
    max-width: 500px;
    margin: 0 auto;
  }

  fieldset {
    border: none;
  }

  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }

  input {
    width: 100%;
  }

  :global(.dropzone) {
    cursor: pointer;
  }

  label {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--med-blue);
    margin: 0 0 5px 2px;
  }

  button {
    justify-content: flex-end;
  }
</style>