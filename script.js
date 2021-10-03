const app = document.querySelector('.app');

const gameState = {
  url: 'https://skypro-rock-scissors-paper.herokuapp.com/',

  token: '',

  gamerName: '',

  enemyName: '',

  move: '',

  roundStatus: '',

  gameId: '',

  enemyList: [],

  gameStatistic: {
    rounds: 0,
    wins: 0,
    loses: 0,
  },

  gamerStatistic: {
    wins: '',
    loses: '',
  },

  enemyStatistic: {
    wins: '',
    loses: '',
  },

  obliqueCross: '&#128942;',
  greenTick: '&#10004;',

  loseMessages: {
    'rock': 'Противник завернул ваш камушек в бумагу!',
    'paper': 'Ножницы разрезают ваш лист бумаги! Не повезло!',
    'scissors': 'Вы извлекли ножницы, но противник заготовил камень! Увы!',
  },

  winMessages: {
    'rock': 'Камнем по нижницам! Это был удачный ход!',
    'paper': 'Что может камень противника против вашего бумажного листа?! Ничего!',
    'scissors': 'Ножницами вы орудуете умело! Лист противника разрезан!',
  },

  drawMessages: {
    'rock': 'Противник припас для тебя камешек. Но у тебя был камешек для него. Ничья!',
    'paper': 'Бумага против бумаги. Результат очевиден. Ничья!',
    'scissors': 'Ты показал ножницы. Противник насупился и показал свои. Ничья!',
  },

  errorMessage: ' ',

  errors: {
    'error': 'Что-то пошло не так',
    ' ': 'Игрок не зарегистрирован',
    'token doesn\'t exist': 'Нет игрока или игры с таким токеном',
    'player is already in game': 'Игрок уже в игре, нельзя начать две игры одновременно',
    'no game id': 'Id игры не передан',
    'wrong game id': 'Id игры некорректный/бой не существует/бой закончен',
    'player is not in this game': 'Игрок не в этой игре',
    'no move': 'Ход не передан',
  },
};

Window.application = {
  blocks: {
    loginButton: {
      block: 'button',
      cls: ['login', 'login-button'],
      innerText: 'Войти',
      method: {
        eventName: 'click',
        methodFunc: () => {
          clickButton();
        },
      },
    },

    loginInput: {
      block: 'input',
      cls: ['login', 'login-input'],
      attrs: {
        placeholder: 'Введи свой nikname',
      },
      method: {
        eventName: 'input',
        methodFunc: () => {
          inputName();
        },
      },
    },

    showedAvailableGame: {
      block: 'div',
      cls: 'main_opponent_profile-block',
      content: [
        {
          block: 'div',
          cls: 'main_opponent_profile-block-header',
          content: [
            {
              block: 'img',
              cls: 'opponent_profile-avatar',
              attrs: {
                src: '/assets/img/avatar.png',
              },
            },
            {
              block: 'h3',
              cls: 'opponent_profile-name',
            },
          ],
        },
        {
          block: 'div',
          cls: 'opponent_profile_statistics-block',
          content: [
            {
              block: 'h3',
              cls: 'statistics-header',
              innerText: 'Статистика Противника',
            },
            {
              block: 'div',
              cls: 'statistic-items',
              content: [
                {
                  block: 'p',
                  cls: 'win',
                },
                {
                  block: 'p',
                  cls: 'loose',
                },
                {
                  block: 'p',
                  cls: 'draw',
                },
              ],
            },
          ],
        },
      ],
    },

    playButton: {
      block: 'div',
      cls: 'createGame',
      content: [
        {
          block: 'button',
          cls: 'create',
          innerText: 'Играть',
          method: {
            eventName: 'click',
            methodFunc: () => {
              clickPlayButton();
            },
          },
        },
      ],
    },

    playerInformation: {
      block: 'div',
      cls: 'main_yourself_profile-block',
      content: [
        {
          block: 'div',
          cls: 'main_yourself_profile-block-header',
          content: [
            {
              block: 'img',
              cls: 'yourself_profile-avatar',
              attrs: {
                src: './assets/img/avatar.png',
              },
            },
            {
              block: 'h2',
              cls: 'yourself_profile-name',
            },
          ],
        },
        {
          block: 'div',
          cls: 'yourself_profile_statistics-block',
          content: [
            {
              block: 'h3',
              cls: 'statistics-header',
              innerText: 'Статистика',
            },
            {
              block: 'div',
              cls: 'statistic-items',
              content: [
                {
                  block: 'p',
                  cls: 'win',
                  innerText: 'Победы : 0',
                },
                {
                  block: 'p',
                  cls: 'loose',
                  innerText: 'Поражения : 0 ',
                },
                {
                  block: 'p',
                  cls: 'draw',
                  innerText: 'Ничьи : 0',
                },
              ],
            },
          ],
        },
      ],
    },

    waitingAnswerServer: {
      block: 'div',
      cls: 'popUpWaitingScreen',
      content: [
        {
          block: 'p',
          cls: 'loadingStatus',
          innertext: 'Получение данных от сервера. Подождите',
        },
        {
          block: 'div',
          cls: 'loader',
          innerText: 'Loading...',
        },
      ],
    },

    rockDiv: {
      block: 'div',
      cls: 'rock',
    },

    paperDiv: {
      block: 'div',
      cls: 'paper',
    },

    scissorsDiv: {
      block: 'div',
      cls: 'scissors',
    },

    errorButton: {
      block: 'button',
      cls: 'error-button',
      innerText: 'Вернуться на страницу регистрации',
      method: {
        eventName: 'click',
        methodFunc: () => {
          gameState.gameId = '';
          gameState.token = '';
          createPageLoginScreen();
        },
      },
    },

    waitingPlayer: {
      block: 'div',
      cls: 'undercard',
      content: [
        {
          block: 'h1',
          cls: 'undercard_text',
          innerText: 'Ожидаем подключение соперника...',
        },
        {
          block: 'div',
          cls: 'lds-hourglass',
        },
      ],
    },


    backToLobbyButton: {
      block: 'div',
      cls: 'back_button_box',
      method: {
        eventName: 'click',
        methodFunc: () => {
          backToLobby();
        },
      },
      content: [
        {
          block: 'button',
          cls: 'back_button_box-button',
          content: [
            {
              block: 'img',
              cls: 'arrow',
              attrs: {
                src: './assets/img/back_arrow.png',
              },
            },
            {
              block: 'h3',
              innerText: 'Вернуться в лобби',
            },
          ],
        },
      ],
    },
  },

  screens: {
    loginScreen: {
      block: 'header',
      cls: 'header_login',
      content: [
        {
          block: 'div',
          cls: 'container',
          content: [
            {
              block: 'div',
              cls: 'main',
              content: [
                {
                  block: 'h1',
                  cls: 'title',
                  content: [
                    {
                      block: 'span',
                      cls: 'rock-text',
                      innerText: 'Камень',
                    },
                    {
                      block: 'span',
                      cls: 'scissors-text',
                      innerText: 'Ножницы',
                    },
                    {
                      block: 'span',
                      cls: 'paper-text',
                      innerText: 'Бумага',
                    },
                  ],
                },
                {
                  block: 'figure',
                  cls: 'title-image',
                  content: [
                    {
                      block: 'div',
                      cls: 'rock-image',
                    },
                    {
                      block: 'div',
                      cls: 'scissors-image',
                    },
                    {
                      block: 'div',
                      cls: 'paper-image',
                    },
                  ],
                },
                {
                  block: 'figure',
                  cls: 'login',
                },
              ],
            },
          ],
        },
      ],
    },

    lobbyScreen: {
      block: 'div',
      cls: 'wrapper',
      content: [
        {
          block: 'div',
          cls: 'header',
          content: [
            {
              block: 'h1',
              innerText: 'Добро пожаловать в лобби',
            },
          ],
        },
        {
          block: 'div',
          cls: 'columnHeaders',
          content: [
            {
              block: 'div',
              cls: 'columnHeader',
              content: [
                {
                  block: 'h2',
                  innerText: 'Вы',
                },
              ],
            },
            {
              block: 'div',
              cls: 'columnHeader2',
              content: [
                {
                  block: 'h2',
                  innerText: ['Доступные игры'],
                },
                {
                  block: 'div',
                  cls: 'listGames',
                  method: {
                    eventName: 'click',
                    methodFunc: (e) => {
                      enterToPlayButton(e);
                    },
                  },
                },
              ],
            },
          ],
        },
        // {
        // 	block: 'div',
        // 	cls: 'popUpWaitingScreen',
        // 	content: [
        // 		{
        // 			block: 'p',
        // 			cls: 'loadingStatus',
        // 			innertext: 'Получение данных от сервера. Подождите',
        // 		},
        // 		{
        // 			block: 'div',
        // 			cls: 'loader',
        // 			innerText: 'Loading...',
        // 		},
        // 	],
        // },
      ],
    },

    standByScreen: {
      block: "div",
      cls: "standBy_container",
      content: [
        {
          block: "div",
          cls: "main",
          content: [
            {
              block: "header",
              cls: "header",
              content: [
                {
                  block: "h1",
                  cls: ["header_text", "text-style"],
                  innerText: "Вы создали комнату",
                },
              ],
            },
            {
              block: "div",
              cls: ["standBy_main_opponent_profile-block", "bigEntrance"],
              content: [
                {
                  block: "div",
                  cls: "main_opponent_profile-block-header",
                  content: [
                    {
                      block: "img",
                      cls: "opponent_profile-avatar",
                      attrs: {
                        src: "./assets/img/avatar.png",
                      },
                    },
                    {
                      block: "h1",
                      cls: ["opponent_profile-name", "text-style"],
                    },
                  ],
                },
                {
                  block: "div",
                  cls: "opponent_profile_statistics-block",
                  content: [
                    {
                      block: "h2",
                      cls: ["statistics-header", "text-style"],
                      innerText: "Ваша Статистика ",
                    },
                    {
                      block: "div",
                      cls: "statistic-items",
                      content: [
                        {
                          block: "h3",
                          cls: ["win", "text-style"],
                        },
                        {
                          block: "h3",
                          cls: ["loose", "text-style"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              block: "div",
              cls: "undercard",
              content: [
                {
                  block: "h1",
                  cls: ["undercard_text", "text-style"],
                  innerText: "Ожидаем подключение соперника...",
                },
                {
                  block: "div",
                  cls: "standBy_lds-hourglass",
                },
              ],
            },
          ],
        },
      ],
    },

    waitScreen: {
      block: 'div',
      content: [
        {
          block: 'header',
          cls: 'header-waitscreen',
          content: [
            {
              block: 'nav',
              cls: 'header-waitscreen__navi',
              content: [
                {
                  block: 'button',
                  cls: 'header-waitscreen__navibar-item',
                  innerText: 'Закончить игру досрочно',
                  method: {
                    eventName: 'click',
                    methodFunc: () => {
                      createPageLobbyScreen();
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          block: 'main',
          cls: 'main-waitscreen',
          content: [
            {
              block: 'section',
              cls: 'main-waitscreen__choicescreen',
              content: [
                {
                  block: 'h2',
                  cls: 'main-waitscreen__choicescreen-title',
                  innerText: 'Choose your fighter',
                },
                {
                  block: 'div',
                  cls: 'main-waitscreen__choicescreen-container',
                  content: [
                    {
                      block: 'button',
                      cls: [
                        'main-waitscreen__choicescreen-paper',
                        'choice-button',
                      ],
                      method: {
                        eventName: 'click',
                        methodFunc: () => {
                          document.querySelector('.your-side-spinner').classList.add('hidden');
                          document.querySelector('.main-waitscreen__gameprocess-choiceimage-paper').classList.remove('hidden');
                          document.querySelector('.main-waitscreen__choicescreen').classList.add('hidden');
                          gameState.move = 'paper';
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen,
                          );
                        },
                      },
                      content: [
                        {
                          block: 'img',
                          cls: 'choice-image',
                          attrs: {
                            src: '/assets/img/paper.jpg',
                            alt: 'paper fighter',
                          },
                        },
                      ],
                    },
                    {
                      block: 'button',
                      cls: [
                        'main-waitscreen__choicescreen-rock',
                        'choice-button',
                      ],
                      method: {
                        eventName: 'click',
                        methodFunc: () => {
                          document.querySelector('.your-side-spinner').classList.add('hidden');
                          document.querySelector('.main-waitscreen__gameprocess-choiceimage-rock').classList.remove('hidden');
                          document.querySelector('.main-waitscreen__choicescreen').classList.add('hidden');
                          gameState.move = 'rock';
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen,
                          );
                        },
                      },
                      content: [
                        {
                          block: 'img',
                          cls: 'choice-image',
                          attrs: {
                            src: '/assets/img/rock.jpg',
                            alt: 'rock fighter',
                          },
                        },
                      ],
                    },
                    {
                      block: 'button',
                      cls: [
                        'main-waitscreen__choicescreen-scissors',
                        'choice-button',
                      ],
                      method: {
                        eventName: 'click',
                        methodFunc: () => {
                          document.querySelector('.your-side-spinner').classList.add('hidden');
                          document.querySelector('.main-waitscreen__gameprocess-choiceimage-scissors').classList.remove('hidden');
                          document.querySelector('.main-waitscreen__choicescreen').classList.add('hidden');
                          gameState.move = 'scissors';
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen,
                          );
                        },
                      },
                      content: [
                        {
                          block: 'img',
                          cls: 'choice-image',
                          attrs: {
                            src: '/assets/img/scissors.jpg',
                            alt: 'scissors fighter',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              block: 'section',
              cls: 'section-waitsceen',
              content: [
                {
                  block: 'h2',
                  cls: 'main-waitscreen__title',
                  innerText: 'Идет великая битва',
                },
                {
                  block: 'div',
                  cls: 'main-waitscreen__gameprocess-container',
                  content: [
                    {
                      block: 'div',
                      cls: 'main-waitscreen__gameprocess-playerzone',
                      content: [
                        {
                          block: 'div',
                          cls: ['lds-hourglass', 'your-side-spinner'],
                        },
                        {
                          block: 'img',
                          cls: [
                            'main-waitscreen__gameprocess-choiceimage-rock',
                            'hidden',
                          ],
                          attrs: {
                            src: './assets/img/rock.jpg',
                            alt: 'choice',
                          },
                        },
                        {
                          block: 'img',
                          cls: [
                            'main-waitscreen__gameprocess-choiceimage-paper',
                            'hidden',
                          ],
                          attrs: {
                            src: './assets/img/paper.jpg',
                            alt: 'choice',
                          },
                        },
                        {
                          block: 'img',
                          cls: [
                            'main-waitscreen__gameprocess-choiceimage-scissors',
                            'hidden',
                          ],
                          attrs: {
                            src: './assets/img/scissors.jpg',
                            alt: 'choice',
                          },
                        },
                        {
                          block: 'div',
                          cls: 'main-waitscreen__gameprocess-userinfo',
                          content: [
                            {
                              block: 'img',
                              cls: 'main-waitscreen__gameprocess-avatar',
                              attrs: {
                                src: './assets/img/userimage.jpg',
                                alt: 'feedback',
                              },
                            },
                            {
                              block: 'div',
                              content: [
                                {
                                  block: 'p',
                                  cls: [
                                    'main-waitscreen__gameprocess-username',
                                    'your-name',
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      block: 'img',
                      cls: 'main-waitscreen__versus-image',
                      attrs: {
                        src: './assets/img/versus.png',
                        alt: 'vsimage',
                      },
                    },
                    {
                      block: 'div',
                      cls: 'main-waitscreen__gameprocess-waiting-another-player',
                      content: [
                        {
                          block: 'div',
                          cls: ['lds-hourglass', 'enemy-scroll'],
                        },
                        {
                          block: 'p',
                          cls: ['main-waitscreen__gameprocess-text', 'hidden'],
                          innerText: 'Противник ожидает ваш ход',
                        },
                        {
                          block: 'div',
                          cls: 'main-waitscreen__gameprocess-userinfo',
                          content: [
                            {
                              block: 'img',
                              cls: 'main-waitscreen__gameprocess-avatar',
                              attrs: {
                                src: './assets/img/userimage.jpg',
                                alt: 'feedback',
                              },
                            },
                            {
                              block: 'div',
                              cls: '',
                              content: [
                                {
                                  block: 'p',
                                  cls: [
                                    'main-waitscreen__gameprocess-username',
                                    'enemy-name',
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    gameFieldScreen: {
      block: 'section',
      cls: 'game-field',
      content: [
        {
          block: 'div',
          cls: 'round-number',
          content: [
            {
              block: 'p',
              cls: ['fadeIn', 'invisible', 'round-num'],
            },
          ],
        },

        {
          block: 'div',
          cls: 'gamer1',
          content: [
            {
              block: 'div',
              cls: 'content-wrapper',
              content: [
                {
                  block: 'h2',
                  innerText: `${gameState.gamerName}`,
                },
                {
                  block: 'div',
                  cls: 'choice-wrapper',
                  content: [
                    {
                      block: 'div',
                      cls: 'result',
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          block: 'div',
          cls: 'gamer2',
          content: [
            {
              block: 'div',
              cls: 'content-wrapper',
              content: [
                {
                  block: 'h2',
                  innerText: `${gameState.enemyName}`,
                },
                {
                  block: 'div',
                  cls: 'choice-wrapper',
                  content: [
                    {
                      block: 'div',
                      cls: 'result',
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          block: 'div',
          cls: ['round-result-field', 'display-none'],
          content: [
            {
              block: 'div',
              cls: ['round-result-wrapper', 'bigEntrance'],
              content: [
                {
                  block: 'div',
                  cls: 'round-result-window',
                  content: [
                    {
                      block: 'div',
                      cls: 'result-declaration',
                      content: [
                        {
                          block: 'p',
                          cls: 'comment',
                        },
                        {
                          block: 'p',
                          cls: 'statistic',
                        },
                        {
                          block: 'p',
                          cls: 'offer',
                          innerText: 'Еще раунд?',
                        },
                      ],
                    },
                    {
                      block: 'div',
                      cls: 'btns-block',
                      content: [
                        {
                          block: 'button',
                          cls: ['button', 'ok-button'],
                          innerText: 'Ok',
                          method: {
                            eventName: 'click',
                            methodFunc: () => {
                              gameState.move = '';
                              gameState.roundStatus = '';
                              createPageWaitScreen();
                            },
                          }
                        },
                        {
                          block: 'button',
                          cls: ['button', 'no-button'],
                          innerText: 'No!!!',
                          method: {
                            eventName: 'click',
                            methodFunc: () => {
                              gameState.gameStatistic.rounds = 0;
                              gameState.gameId = '';
                              createPageLobbyScreen();
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  block: 'div',
                  cls: 'round-result-frame',
                },
              ],
            },
          ],
        },
      ],
    },

    errorScreen: {
      block: 'section',
      cls: 'error-field',
      content: [
        {
          block: 'div',
          cls: ['rock', 'error-rock'],
        },
        {
          block: 'p',
          cls: 'error-message',
          innerText: gameState.errors[gameState.errorMessage],
        },
      ],
    },
  },

  request: (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('readystatechange', function(e) {
      if (e.target.readyState !== 4) {
        return;
      }
      if (e.target.status !== 200) {
        gameState.errorMessage = 'error';
        startErrorScreen();
      }
      const responseText = JSON.parse(e.target.responseText);

      if (responseText.status === 'error') {
        gameState.errorMessage = responseText.message;
        startErrorScreen();
      }

      callback(responseText);
    });
    xhr.send();
  },

  templateEngine: (block) => {
    if (!block) {
      return document.createTextNode('');
    }

    if (
      typeof block === 'string' ||
      typeof block === 'number' ||
      block === true
    ) {
      return document.createTextNode(String(block));
    }

    if (Array.isArray(block)) {
      const fragment = document.createDocumentFragment();

      block.forEach(contentItem => {
        const el = Window.application.templateEngine(contentItem);

        fragment.appendChild(el);
      });

      return fragment;
    }

    const element = document.createElement(block.block);

    []
      .concat(block.cls)
      .filter(Boolean)
      .forEach(className => element.classList.add(className));

    if (block.attrs) {
      Object.keys(block.attrs).forEach(key => {
        element.setAttribute(key, block.attrs[key]);
      });
    }

    if (block.innerText) element.innerText = block.innerText;

    if (block.method) element.addEventListener(block.method.eventName, block.method.methodFunc);

    element.appendChild(Window.application.templateEngine(block.content));

    return element;
  },

  renderScreen: (obj) => {
    Window.application.timers.forEach(timer => clearInterval(timer));

    Window.application.timers.length = 0;

    if (app.hasChildNodes()) {
      while (app.firstChild) {
        app.removeChild(app.lastChild);
      }
    }

    app.appendChild(Window.application.templateEngine(obj));
  },

  renderBlock: (arrObj, parentNode) => {
    arrObj.forEach(obj => parentNode.append(Window.application.templateEngine(obj)));
  },

  timers: [],
};

//Login Screen

function getPlayerStatus(parseStatus) {
  if (parseStatus['player-status'].status === 'lobby') {
    createPageLobbyScreen();
  }
  if (parseStatus['player-status'].status === 'game') {
    createPageWaitScreen(parseStatus);
  }
  if (parseStatus['player-status'].status === 'error') {
    startErrorScreen();
  }
}

//получение токена и статуса
function getTokenGetPlayerStatus(data) {
  gameState.token = data.token;
  Window.application.request(
    `${gameState.url}player-status?token=${gameState.token}`,
    getPlayerStatus,
  );
}


//получение никнэйма
function inputName() {
  gameState.gamerName = document.querySelector('.login-input').value;
}

//работа кнопки залогиниться
function clickButton() {
  Window.application.request(
    `${gameState.url}login?login=${gameState.gamerName}`,
    getTokenGetPlayerStatus,
  );
}

//функция-обертка для логин-страницы
function createPageLoginScreen() {
  Window.application.renderScreen(Window.application.screens.loginScreen);
  Window.application.renderBlock(
    [Window.application.blocks.loginInput, Window.application.blocks.loginButton],
    app.querySelector('.login'),
  );
}


//Lobby Screen

//функция получения id игры. Создание своей игры
function createGame(parsedData) {
  gameState.gameId = parsedData['player-status'].game.id;
  console.log(gameState.gameId);
  createPageStandByScreen();
}

//нажатие на кнопку 'создать игру'
function clickPlayButton() {
  console.log(gameState.token);
  Window.application.request(`${gameState.url}start?token=${gameState.token}`, createGame);
}


//Кнопка играть
function enterToPlayButton(e) {
  if (e.target.nodeName.toLowerCase() !== 'button') return;
  Window.application.request(`${gameState.url}game-status?token=${gameState.token}&id=${gameState.gameId}`, enterGame);
}

function enterGame(parsedData) {
  if (parsedData.status === 'error') {
    gameState.errorMessage = parsedData['message'];
    startErrorScreen();
  }

  if (parsedData['game-status'].status === 'waiting-for-your-move') checkOpponentConnection(parsedData);
}

//получение информации об игроке
function getStatisticPlayer(parsedData) {
  parsedData.list.forEach(function(obj) {
    if (Object.keys(obj).includes('you')) {
      // gameState.gamerStatistic.wins = obj.wins;
      // gameState.gamerStatistic.loses = obj.loses;
      Window.application.renderBlock(
        [Window.application.blocks.playerInformation],
        app.querySelector('.columnHeader'),
      );
      document.querySelector('.yourself_profile-name').textContent = gameState.gamerName;
    }
  });
}

//отрисовка листа соперников
function renderingEnemyList(enemyList) {
  while (document.querySelector('.listGames').firstChild) {
    document
      .querySelector('.listGames')
      .removeChild(document.querySelector('.listGames').lastChild);
  }

  gameState.enemyList.length = 0;

  for (let enemy of enemyList) {
    gameState.enemyList.push(enemy);

    if (!enemy.you) {
      Window.application.renderBlock(
        [Window.application.blocks.showedAvailableGame],
        document.querySelector('.listGames'),
      );
      let enemies = document.querySelector('.listGames').querySelectorAll('.opponent_profile-name');
      enemies[enemies.length - 1].textContent = enemy.login;
    }
  }
}

//получение информации об актуальных играх
function getAvailableGame(parseStatisticEnemy) {
  if (gameState.enemyList.length !== parseStatisticEnemy.list.length) {
    renderingEnemyList(parseStatisticEnemy.list);
    return;
  }

  for (let i = 0; i < gameState.enemyList.length; i++) {
    if (gameState.enemyList[i].login !== parseStatisticEnemy.list[i].login) {
      renderingEnemyList(parseStatisticEnemy.list);
      return;
    }
  }
}

//функция-обертка для лобби-страницы
function createPageLobbyScreen() {
  Window.application.renderScreen(Window.application.screens.lobbyScreen);

  Window.application.request(
    `${gameState.url}player-list?token=${gameState.token}`,
    getStatisticPlayer,
  );
  Window.application.renderBlock([Window.application.blocks.playButton], document.querySelector('.columnHeader'));
  Window.application.timers.push(
    setInterval(
      Window.application.request,
      1000,
      `${gameState.url}player-list?token=${gameState.token}`,
      getAvailableGame,
    ),
  );
}


// standByScreen

//переход на экран лобби
function backToLobby() {
  createPageLobbyScreen();
}

//переход на экран игры
function checkOpponentConnection(parsedData) {
  if (parsedData['game-status'].status !== 'waiting-for-start') {
    if (parsedData.status === 'error') {
      gameState.errorMessage = parsedData['message'];
      startErrorScreen();
    }
    // console.log(gameState.token)
    // console.log(gameState.gameId)
    // console.log(parsedData['game-status'].enemy.login)
    if (parsedData['game-status'].status === 'waiting-for-your-move') {
      gameState.enemyName = parsedData['game-status'].enemy.login;
      gameState.roundStatus = parsedData['game-status'].status;
      createPageWaitScreen();
    }
    gameState.roundStatus = parsedData['game-status'].status;
  }
  // gameState.enemyStatistic.wins = parsedData['game-status'].enemy.wins;
  // gameState.enemyStatistic.loses = parsedData['game-status'].enemy.loses;
}


function createPageStandByScreen() {
  Window.application.renderScreen(Window.application.screens.standByScreen);
  document.querySelector(".opponent_profile-name").textContent = gameState.gamerName;
  document.querySelector(".win").textContent = `Побед:  ${gameState.gamerStatistic.wins}`;
  document.querySelector(".loose").textContent = `Поражений: ${gameState.gamerStatistic.loses}`;
  Window.application.renderBlock([Window.application.blocks.waitingPlayer],document.querySelector(".main"));
  Window.application.renderBlock([Window.application.blocks.backToLobbyButton],document.querySelector(".undercard"));
  Window.application.timers.push(setInterval(Window.application.request, 500,`${gameState.url}game-status?token=${gameState.token}&id=${gameState.gameId}`, checkOpponentConnection));
}

//waitScreen
//  Сценарий
function createPageWaitScreen() {
  Window.application.renderScreen(Window.application.screens.waitScreen);
  Window.application.timers.push(setInterval(Window.application.request,
    500,
    `${gameState.url}game-status?token=${gameState.token}&id=${gameState.gameId}`,
    switchWaitScreen));
  document.querySelector('.your-name').textContent = gameState.gamerName;
  document.querySelector('.enemy-name').textContent = gameState.enemyName;
}

// функция для появления надписи Противник ожидает хода
function switchWaitScreen(parsedData) {
  if (parsedData.status !== 'ok') {
    gameState.errorMessage = parsedData.message;
    startErrorScreen();
  }

  if (parsedData['game-status'].status === 'waiting-for-your-move') {
    document.querySelector('.main-waitscreen__gameprocess-text').classList.remove('hidden');
    document.querySelector('.enemy-scroll').classList.add('hidden');
  }

  if (parsedData['game-status'].status !== 'waiting-for-your-move') {
    gameState.roundStatus = parsedData['game-status'].status;
    gameState.gameStatistic.rounds += 1;
    startGameFieldScreen();
  }

}

// функция хода игрока
function switchToGameFieldScreen(parsedData) {
  if (parsedData.status === 'ok') {
    console.log(parsedData['game-status'].status);
    if (serverAnswer['game-status'].status !== 'waiting-for-enemy-move') {
      gameState.roundStatus = parsedData['game-status'].status;
      startGameFieldScreen();
    }
  } else {
    gameState.errorMessage = serverAnswer.message;
    startErrorScreen();
  }
}

// GameField Screen
const selectPlayerChoiceBlock = (choice) => {
  switch (choice) {
    case 'rock':
      return Window.application.blocks.rockDiv;

    case 'paper':
      return Window.application.blocks.paperDiv;

    default:
      return Window.application.blocks.scissorsDiv;
  }
};

const selectEnemyChoiceBlock = (gamerChoice, roundStatus) => {
  if (roundStatus === 'lose') {
    gameState.gameStatistic.loses += 1;

    switch (gamerChoice) {
      case 'rock':
        app.querySelector('.comment').textContent = gameState.loseMessages['rock'];
        return Window.application.blocks.paperDiv;

      case 'paper':
        app.querySelector('.comment').textContent = gameState.loseMessages['paper'];
        return Window.application.blocks.scissorsDiv;

      default:
        app.querySelector('.comment').textContent = gameState.loseMessages['scissors'];
        return Window.application.blocks.rockDiv;
    }
  }

  if (roundStatus === 'win') {
    gameState.gameStatistic.wins += 1;

    switch (gamerChoice) {
      case 'rock':
        app.querySelector('.comment').textContent = gameState.winMessages['rock'];
        return Window.application.blocks.scissorsDiv;

      case 'paper':
        app.querySelector('.comment').textContent = gameState.winMessages['paper'];
        return Window.application.blocks.rockDiv;

      default:
        app.querySelector('.comment').textContent = gameState.winMessages['scissors'];
        return Window.application.blocks.paperDiv;
    }
  }

  switch (gamerChoice) {
    case 'rock':
      app.querySelector('.comment').textContent = gameState.drawMessages['rock'];
      return Window.application.blocks.rockDiv;

    case 'paper':
      app.querySelector('.comment').textContent = gameState.drawMessages['paper'];
      return Window.application.blocks.paperDiv;

    default:
      app.querySelector('.comment').textContent = gameState.drawMessages['scissors'];
      return Window.application.blocks.scissorsDiv;
  }
};

const drawCrossAndCheckMark = (roundStatus) => {
  const results = app.querySelectorAll('.result');
  if (roundStatus === 'lose') {
    results[0].innerHTML = gameState.obliqueCross;
    results[0].classList.add('oblique-cross');
    results[0].classList.add('opacity');
    results[1].innerHTML = gameState.greenTick;
    results[1].classList.add('green-tick');
    results[1].classList.add('opacity');
  }

  if (roundStatus === 'win') {
    results[1].innerHTML = gameState.obliqueCross;
    results[1].classList.add('oblique-cross');
    results[1].classList.add('opacity');
    results[0].innerHTML = gameState.greenTick;
    results[0].classList.add('green-tick');
    results[0].classList.add('opacity');
  }
};

const showRoundResultWindow = (roundStatus, gamerChoice) => {
  if (roundStatus === 'lose') {
    app.querySelector('.comment').innerHTML = gameState.loseMessages[gamerChoice];
  }
  if (roundStatus === 'lose') {
    app.querySelector('.comment').innerHTML = gameState.winMessages[gamerChoice];
  }
  if (roundStatus === 'waiting-for-your-move') {
    app.querySelector('.comment').innerHTML = gameState.drawMessages[gamerChoice];
  }

  app.querySelector('.round-result-field').classList.remove('display-none');
};

function startGameFieldScreen() {
  Window.application.renderScreen(Window.application.screens.gameFieldScreen);
  Window.application.renderBlock([selectPlayerChoiceBlock(gameState.move)], app.querySelectorAll('.choice-wrapper')[0]);
  Window.application.renderBlock([selectEnemyChoiceBlock(gameState.move, gameState.roundStatus)], app.querySelectorAll('.choice-wrapper')[1]);
  app.querySelector('.round-num').textContent = `Раунд ${gameState.gameStatistic.rounds}`;
  app.querySelector('.statistic').textContent = `Побед: ${gameState.gameStatistic.wins}, поражений: ${gameState.gameStatistic.loses}, вничью: ${gameState.gameStatistic.rounds - gameState.gameStatistic.wins - gameState.gameStatistic.loses}`;
  setTimeout(drawCrossAndCheckMark, 4300, gameState.roundStatus);
  setTimeout(showRoundResultWindow, 5500, gameState.roundStatus, gameState.move);
}

// Error Screen

function startErrorScreen() {
  Window.application.renderScreen(Window.application.screens.errorScreen);
  Window.application.renderBlock([Window.application.blocks.errorButton], app.querySelector('.error-field'));
  app.querySelector('.error-message').textContent = gameState.errors[gameState.errorMessage];
}

document.addEventListener('DOMContentLoaded', createPageLoginScreen);
