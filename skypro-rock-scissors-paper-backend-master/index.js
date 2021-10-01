const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');

app.use(cors());

function readUsers() {
  const usersJSON = fs.readFileSync('users.json');
  let users;

  try {
    users = JSON.parse(usersJSON);
  } catch (error) {
    console.error('error reading users.json');
    throw error;
  }

  return users;
}

function saveUsers(users) {
  const newUsersJson = JSON.stringify(users, null, 4);

  fs.writeFileSync('users.json', newUsersJson);
}

function getUserByToken(users, token) {
  return users.find(user => user.token === token);
}

function getUserByLogin(users, login) {
  return users.find(user => user.login === login);
}

function userInfo(user, token) {
  return {
    login: user.login,
    wins: user.wins,
    loses: user.loses,
    rocks: user.rocks,
    scissors: user.scissors,
    papers: user.papers,
    you: token === user.token ? true : undefined,
  };
}

function getGameByLogin(games, login) {
  return games.find(game =>
    game.status !== 'finished' &&
      game.players.some(player => player.login === login));
}

function getGameById(games, id) {
  return games.find(game => game.id === id);
}

function getPendingGame(games) {
  return games.find(game => game.status === 'pending');
}

function readGames() {
  const gamesJSON = fs.readFileSync('games.json');
  let games;

  try {
    games = JSON.parse(gamesJSON);
  } catch (error) {
    console.error('error reading games.json');
    throw error;
  }

  return games;
}

function saveGames(games) {
  const newGamesJson = JSON.stringify(games, null, 4);

  fs.writeFileSync('games.json', newGamesJson);
}

function calculateStatus(current, enemy) {
  if (!enemy) {
    return 'waiting-for-start';
  }

  if (!current.move) {
    return 'waiting-for-your-move';
  }

  if (!enemy.move) {
    return 'waiting-for-enemy-move';
  }

  if (current.move === 'rock') {
    return enemy.move === 'paper' ? 'lose' : 'win';
  }

  if (current.move === 'scissors') {
    return enemy.move === 'rock' ? 'lose' : 'win';
  }

  if (current.move === 'paper') {
    return enemy.move === 'scissors' ? 'lose' : 'win';
  }
}

const fieldsMap = {
  rock: 'rocks',
  scissors: 'scissors',
  paper: 'papers',
};

function addUserMove(users, login, move) {
  const user = users.find(user => user.login === login);

  user[fieldsMap[move]] += 1;
};

function addUserWin(users, { login }) {
  const user = users.find(user => user.login === login);

  user.wins += 1;
};

function addUserLoss(users, { login }) {
  const user = users.find(user => user.login === login);

  user.loses += 1;
};

app.get('/ping', (req, res) => {
  res.send({
    status: 'ok',
    message: 'pong',
  });
});

app.get('/login', (req, res) => {
  const login = req.query.login;

  if (!login) {
    res.send({
      status: 'error',
    });

    return;
  }

  const users = readUsers();

  let user = users.find(user => user.login === login);

  if (!user) {
    user = {
      login,
      wins: 0,
      loses: 0,
      rocks: 0,
      papers: 0,
      scissors: 0,
    };

    users.push(user);
  }

  user.token = uuidv4();

  saveUsers(users);

  res.send({
    status: 'ok',
    token: user.token,
  });
});

app.get('/player-status', (req, res) => {
  const token = req.query.token;

  if (!token) {
    res.send({
      status: 'error',
      message: 'no token sent',
    });

    return;
  }

  const users = readUsers();

  const user = getUserByToken(users, token);

  if (!user) {
    res.send({
      status: 'error',
      message: 'token doesn\'t exist',
    });

    return;
  }

  const games = readGames();

  const playerGame = getGameByLogin(games, user.login);

  if (!playerGame) {
    res.send({
      status: 'ok',
      'player-status': {
        status: 'lobby',
      },
    });

    return;
  }

  res.send({
    status: 'ok',
    'player-status': {
      status: 'game',
      'game': {
        id: playerGame.id,
      },
    },
  });
});

app.get('/start', (req, res) => {
  const token = req.query.token;

  if (!token) {
    res.send({
      status: 'error',
      message: 'no token sent',
    });

    return;
  }

  const users = readUsers();

  const user = getUserByToken(users, token);

  if (!user) {
    res.send({
      status: 'error',
      message: 'token doesn\'t exist',
    });

    return;
  }

  const games = readGames();

  const playerGame = getGameByLogin(games, user.login);

  if (playerGame) {
    res.send({
      status: 'error',
      message: 'player is already in game',
    });

    return;
  }

  let game = getPendingGame(games);

  if (game) {
    game.status = 'game';
    game.players.push({
      login: user.login
    });
  } else {
    game = {
      id: nanoid(8),
      status: 'pending',
      players: [
        {
          login: user.login
        }
      ]
    };

    games.push(game);
  }

  saveGames(games);

  res.send({
    status: 'ok',
    'player-status': {
      status: 'game',
      'game': {
        id: game.id,
      },
    },
  });
});

app.get('/game-status', (req, res) => {
  const token = req.query.token;

  if (!token) {
    res.send({
      status: 'error',
      message: 'no token sent',
    });

    return;
  }

  const users = readUsers();

  const user = getUserByToken(users, token);

  if (!user) {
    res.send({
      status: 'error',
      message: 'token doesn\'t exist',
    });

    return;
  }

  const id = req.query.id;

  if (!id) {
    res.send({
      status: 'error',
      message: 'no game id',
    });

    return;
  }

  const games = readGames();

  const game = getGameById(games, id);

  if (!game) {
    res.send({
      status: 'error',
      message: 'wrong game id',
    });

    return;
  }

  const currentPlayer = game.players.find(player => player.login === user.login);

  if (!currentPlayer) {
    res.send({
      status: 'error',
      message: 'player is not in this game',
    });

    return;
  }

  const enemyPlayer = game.players.find(player => player.login !== user.login);

  res.send({
    status: 'ok',
    'game-status': {
      status: calculateStatus(currentPlayer, enemyPlayer),
      enemy: enemyPlayer && userInfo(getUserByLogin(users, enemyPlayer.login))
    }
  });
});

app.get('/play', (req, res) => {
  const move = req.query.move;

  if (!move) {
    res.send({
      status: 'error',
      message: 'no move',
    });

    return;
  }

  if (!['rock', 'scissors', 'paper'].includes(move)) {
    res.send({
      status: 'error',
      message: 'wrong move',
    });

    return;
  }

  const token = req.query.token;

  if (!token) {
    res.send({
      status: 'error',
      message: 'no token sent',
    });

    return;
  }

  const users = readUsers();

  const user = getUserByToken(users, token);

  if (!user) {
    res.send({
      status: 'error',
      message: 'token doesn\'t exist',
    });

    return;
  }

  const id = req.query.id;

  if (!id) {
    res.send({
      status: 'error',
      message: 'no game id',
    });

    return;
  }

  const games = readGames();

  const game = getGameById(games, id);

  if (!game) {
    res.send({
      status: 'error',
      message: 'wrong game id',
    });

    return;
  }

  const currentPlayer = game.players.find(player => player.login === user.login);

  if (!currentPlayer) {
    res.send({
      status: 'error',
      message: 'player is not in this game',
    });

    return;
  }

  const enemyPlayer = game.players.find(player => player.login !== user.login);

  if (!enemyPlayer) {
    res.send({
      status: 'error',
      message: 'game not started',
    });

    return;
  }

  const status = calculateStatus(currentPlayer, enemyPlayer);

  if (status === 'waiting-for-enemy-move') {
    res.send({
      status: 'error',
      message: 'not your move',
    });

    return;
  }

  if (status === 'win' || status === 'lose') {
    res.send({
      status: 'error',
      message: 'game finished',
    });

    return;
  }

  if (status !== 'waiting-for-your-move') {
    res.send({
      status: 'error',
      message: 'unknown game status',
    });

    return;
  }

  currentPlayer.move = move;

  if (enemyPlayer.move) {
    addUserMove(users, currentPlayer.login, currentPlayer.move);
    addUserMove(users, enemyPlayer.login, enemyPlayer.move);

    if (enemyPlayer.move === currentPlayer.move) {
      enemyPlayer.move = undefined;
      currentPlayer.move = undefined;
    } else {
      game.status = 'finished';

      const newStatus = calculateStatus(currentPlayer, enemyPlayer);

      if (newStatus === 'win') {
        addUserWin(users, currentPlayer);
        addUserLoss(users, enemyPlayer);
      } else {
        addUserLoss(users, currentPlayer);
        addUserWin(users, enemyPlayer);
      }
    }

    saveUsers(users);
  }

  saveGames(games);

  res.send({
    status: 'ok',
    'game-status': {
      status: calculateStatus(currentPlayer, enemyPlayer),
      enemy: enemyPlayer && userInfo(getUserByLogin(users, enemyPlayer.login))
    }
  });
});

app.get('/player-list', (req, res) => {
  const token = req.query.token;

  const users = readUsers();

  res.send({
    status: 'ok',
    list: users.map(user => userInfo(user, token)),
  });
});

app.listen(port, () => {
  console.log(`🗿 ✂️  📜 backend app listening at http://localhost:${port}`);
});
