const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PlayerSchema = new mongoose.Schema({
  name: String,
  id: String,
  image: String,
  shirt: {
    left: Number,
    name: String
  },
  weapon: {
    left: Number,
    name: String
  },
  pant: {
    left: Number,
    name: String
  }
});
const Player = mongoose.model('Player', PlayerSchema);

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'public/index.html'));
  win.webContents.openDevTools();
};

app.on('ready', () => {
  // connect to mongodb
  mongoose.connect('mongodb://localhost/teddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MONGO DB ERROR:'));

  createWindow();
});

ipcMain.on('create-player', async (event, data) => {
  const id = uuidv4();
  const player = new Player({
    ...data,
    id
  });
  await player.save();
  event.reply('player-saved', id);
});

ipcMain.on('get-player', async (event, playerId) => {
  const playerData = await Player.findOne({ id: playerId }).exec();
  event.reply('got-player', playerData);
});

ipcMain.on('update-player', async (event, data) => {
  const { _id, ...restPlayer } = data;
  await Player.updateOne({ id: data.id }, restPlayer);
  event.reply('player-updated');
});

ipcMain.on('get-all-players', async event => {
  const playersData = await Player.find({}).exec();
  event.reply('got-all-players', playersData);
});

ipcMain.on('get-battle-players', async (event, playerIds) => {
  const playersData = await Player.find({ id: { $in: playerIds } }).exec();
  event.reply('got-battle-players', playersData);
});

ipcMain.on('delete-player', async (event, playerId) => {
  await Player.deleteOne({ id: playerId }).exec();
  event.reply('deleted-player');
});
