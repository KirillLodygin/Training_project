const app = document.querySelector('.app');

const gameState = {
  url: 'http://localhost:3000/',

  token: '',

  gamerName: '',

  enemyName: '',

  move: '',

  roundStatus: '',

  gameId: '',

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

window.application = {
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
                src: './assets/img/avatar.png',
              },
            },
            {
              block: 'h3',
              cls: 'opponent_profile-name',
              innerText: 'Пётр',
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
                  innerText: 'Победы : 0',
                },
                {
                  block: 'p',
                  cls: 'loose',
                  innerText: 'Поражения : 0',
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
        {
          block: 'div',
          cls: 'enterBlock',
          content: [
            {
              block: 'button',
              cls: 'enterButton',
              innerText: 'Войти в игру',
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
          innerText: 'Создать игру',
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
              innerText: `${gameState.gamerName}`,
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
          window.application.renderScreen(window.application.screens.loginScreen);
        },
      },
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
      block: 'div',
      cls: 'container',
      content: [
        {
          block: 'div',
          cls: 'main',
          content: [
            {
              block: 'header',
              cls: 'header',
              content: [
                {
                  block: 'h1',
                  cls: 'header_text',
                  innerText: 'Вы создали комнату',
                },
              ],
            },
            {
              block: 'div',
              cls: ['main_opponent_profile-block', 'bigEntrance'],
              content: [
                {
                  block: 'div',
                  cls: 'main_opponent_profile-block-header',
                  content: [
                    {
                      block: 'img',
                      cls: 'opponent_profile-avatar',
                      attrs: {
                        src: './assets/img/avatar.png',
                      },
                    },
                    {
                      block: 'h1',
                      cls: 'opponent_profile-name',
                      innerText: `${gameState.gamerName}`,
                    },
                  ],
                },
                {
                  block: 'div',
                  cls: 'opponent_profile_statistics-block',
                  content: [
                    {
                      block: 'h2',
                      cls: 'statistics-header',
                      innerText: 'Ваша Статистика ',
                    },
                    {
                      block: 'div',
                      cls: 'statistic-items',
                      content: [
                        {
                          block: 'h3',
                          cls: 'win',
                          innerText:
                            `Победы : ${gameState.gamerStatistic.wins}`,
                        },
                        {
                          block: 'h3',
                          cls: 'loose',
                          innerText:
                            `Поражения : ${gameState.gamerStatistic.loses}`,
                        },
                        {
                          block: 'h3',
                          cls: 'draw',
                          innerText: 'Ничьи :  ',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
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
          ],
        },
      ],
    },

    waitScreen: {
      block: "div",
      content: [
        {
          block: "header",
          cls: "header-waitscreen",
          content: [
            {
              block: "nav",
              cls: "header-waitscreen__navi",
              content: [
                {
                  block: "button",
                  cls: "header-waitscreen__navibar-item",
                  innerText: "Закончить игру досрочно",
                  method: {
                    eventName: "click",
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
          block: "main",
          cls: "main-waitscreen",
          content: [
            {
              block: "section",
              cls: "main-waitscreen__choicescreen",
              content: [
                {
                  block: "h2",
                  cls: "main-waitscreen__choicescreen-title",
                  innerText: "Choose your fighter",
                },
                {
                  block: "div",
                  cls: "main-waitscreen__choicescreen-container",
                  content: [
                    {
                      block: "button",
                      cls: [
                        "main-waitscreen__choicescreen-paper",
                        "choice-button",
                      ],
                      method: {
                        eventName: "click",
                        methodFunc: () => {
                          yourSideSpinner.classList.add("hidden");
                          paperImage.classList.remove("hidden");
                          choiceScreen.classList.add("hidden");
                          gameState.move = "paper";
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen
                          );
                        },
                      },
                      content: [
                        {
                          block: "img",
                          cls: "choice-image",
                          attrs: {
                            src: "./assets/images/paper.jpg",
                            alt: "paper fighter",
                          },
                        },
                      ],
                    },
                    {
                      block: "button",
                      cls: [
                        "main-waitscreen__choicescreen-rock",
                        "choice-button",
                      ],
                      method: {
                        eventName: "click",
                        methodFunc: () => {
                          yourSideSpinner.classList.add("hidden");
                          rockImage.classList.remove("hidden");
                          choiceScreen.classList.add("hidden");
                          gameState.move = "rock";
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen
                          );
                        },
                      },
                      content: [
                        {
                          block: "img",
                          cls: "choice-image",
                          attrs: {
                            src: "./assets/images/rock.jpg",
                            alt: "rock fighter",
                          },
                        },
                      ],
                    },
                    {
                      block: "button",
                      cls: [
                        "main-waitscreen__choicescreen-scissors",
                        "choice-button",
                      ],
                      method: {
                        eventName: "click",
                        methodFunc: () => {
                          yourSideSpinner.classList.add("hidden");
                          scissorsImage.classList.remove("hidden");
                          choiceScreen.classList.add("hidden");
                          gameState.move = "scissors";
                          gameState.gameStatistic.rounds += 1;
                          Window.application.request(
                            `${gameState.url}play?token=${gameState.token}&id=${gameState.gameId}&move=${gameState.move}`,
                            switchToGameFieldScreen
                          );
                        },
                      },
                      content: [
                        {
                          block: "img",
                          cls: "choice-image",
                          attrs: {
                            src: "./assets/images/scissors.jpg",
                            alt: "scissors fighter",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              block: "section",
              cls: "section-waitsceen",
              content: [
                {
                  block: "h2",
                  cls: "main-waitscreen__title",
                  innerText: "Идет великая битва",
                },
                {
                  block: "div",
                  cls: "main-waitscreen__gameprocess-container",
                  content: [
                    {
                      block: "div",
                      cls: "main-waitscreen__gameprocess-playerzone",
                      content: [
                        {
                          block: "div",
                          cls: ["lds-hourglass", "your-side-spinner"],
                        },
                        {
                          block: "img",
                          cls: [
                            "main-waitscreen__gameprocess-choiceimage-rock",
                            "hidden",
                          ],
                          attrs: {
                            src: "./assets/images/rock.jpg",
                            alt: "choice",
                          },
                        },
                        {
                          block: "img",
                          cls: [
                            "main-waitscreen__gameprocess-choiceimage-paper",
                            "hidden",
                          ],
                          attrs: {
                            src: "./assets/images/paper.jpg",
                            alt: "choice",
                          },
                        },
                        {
                          block: "img",
                          cls: [
                            "main-waitscreen__gameprocess-choiceimage-scissors",
                            "hidden",
                          ],
                          attrs: {
                            src: "./assets/images/scissors.jpg",
                            alt: "choice",
                          },
                        },
                        {
                          block: "div",
                          cls: "main-waitscreen__gameprocess-userinfo",
                          content: [
                            {
                              block: "img",
                              cls: "main-waitscreen__gameprocess-avatar",
                              attrs: {
                                src: "./assets/images/userimage.jpg",
                                alt: "feedback",
                              },
                            },
                            {
                              block: "div",
                              content: [
                                {
                                  block: "p",
                                  cls: [
                                    "main-waitscreen__gameprocess-username",
                                    "your-name",
                                  ],
                                  innerText: gameState.gamerName,
                                },
                                {
                                  block: "p",
                                  cls: "main-waitscreen__gameprocess-statistic",
                                  content: [
                                    {
                                      block: "span",
                                      cls: "your-wins",
                                      innerText: `Побед: ${gameState.gamerStatistic.wins}`,
                                    },
                                    {
                                      block: "span",
                                      cls: "your-defeats",
                                      innerText: `Поражений: ${gameState.gamerStatistic.loses}`,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      block: "img",
                      cls: "main-waitscreen__versus-image",
                      attrs: {
                        src: "./assets/images/versus.png",
                        alt: "vsimage",
                      },
                    },
                    {
                      block: "div",
                      cls: "main-waitscreen__gameprocess-waiting-another-player",
                      content: [
                        {
                          block: "div",
                          cls: ["lds-hourglass", "enemy-scroll"],
                        },
                        {
                          block: "p",
                          cls: ["main-waitscreen__gameprocess-text", "hidden"],
                          innerText: "Противник ожидает ваш ход",
                        },
                        {
                          block: "div",
                          cls: "main-waitscreen__gameprocess-userinfo",
                          content: [
                            {
                              block: "img",
                              cls: "main-waitscreen__gameprocess-avatar",
                              attrs: {
                                src: "./assets/images/userimage.jpg",
                                alt: "feedback",
                              },
                            },
                            {
                              block: "div",
                              cls: "",
                              content: [
                                {
                                  block: "p",
                                  cls: [
                                    "main-waitscreen__gameprocess-username",
                                    "enemy-name",
                                  ],
                                  innerText: gameState.enemyName,
                                },
                                {
                                  block: "p",
                                  cls: "main-waitscreen__gameprocess-statistic",
                                  content: [
                                    {
                                      block: "span",
                                      cls: "enemy-wins",
                                      innerText: `Побед: ${gameState.enemyStatistic.wins}`,
                                    },
                                    {
                                      block: "span",
                                      cls: "enemy-defeats",
                                      innerText: `Поражений: ${gameState.enemyStatistic.loses}`,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      method: {
                        eventName: "DOMContentLoaded",
                        methodFunc: () => {
                          Window.application.timers.push(setInterval(window.application.request,
                            500,
                            `${gameState.url}game-status?token=${gameState.token}&id=${gameState.gameId}`,
                            switchWaitScreen));
                        },
                      },
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
              cls: ['fadeIn', 'invisible'],
              innerText: `Раунд ${gameState.gameStatistic.rounds}`,
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
                  cls: 'round-result-Window',
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
                          innerText: `Побед: ${gameState.gameStatistic.wins}, поражений: ${gameState.gameStatistic.loses}, вничью: ${gameState.gameStatistic.rounds - gameState.gameStatistic.wins - gameState.gameStatistic.loses}`,
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
                          cls: 'ok-button',
                          innerText: 'Ok',
                        },
                        {
                          block: 'button',
                          cls: 'no-button',
                          innerText: 'No!!!',
                          method: {
                            eventName: 'click',
                            methodFunc: () => {
                              createScreen(window.application.screens.loginScreen);
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
        return;
      }
      const responseText = e.target.responseText;

      callback(responseText);
    });
    xhr.send();
  },

  templateEngine: block => {
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
        const el = templateEngine(contentItem);

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

    element.appendChild(templateEngine(block.content));

    return element;
  },

  renderScreen: (obj) => {
    window.application.timers.forEach(timer => clearInterval(timer));

    window.application.timers.length = 0;

    if (app.hasChildNodes()) {
      while (app.firstChild) {
        app.removeChild(app.lastChild);
      }
    }

    app.appendChild(templateEngine(obj));
  },

  renderBlock: (arrObj, parentNode) => {
    arrObj.forEach(obj => parentNode.append(window.application.templateEngine(obj)));
  },

  timers: [],
}

function disassemblyJSON(objJSON) {
  return JSON.parse(objJSON);
}


//Login Screen

function getPlayerStatus(data) {
  const parseStatus = disassemblyJSON(data);

  if (parseStatus['player-status'].status === 'lobby') {
    createPageLobbyScreen();
  }
  if (parseStatus['player-status'].status === 'game') {
    window.application.renderScreen(window.application.screens.waitScreen);
  }
  if (parseStatus['player-status'].status === 'error') {
    startErrorScreen();
  }
}

//получение токена и статуса
function getTokenGetPlayerStatus(data) {
  const parseToken = disassemblyJSON(data);
  gameState.token = parseToken.token;
  gameState.gamerName = inputName();

  Window.application.request(
    `${gameState.url}player-status?token=${gameState.gamerToken}`,
    getPlayerStatus
  );
}

//получение никнэйма
function inputName() {
  namePlayer = document.querySelector('.login-input').value;
}

//работа кнопки залогиниться
function clickButton() {
  Window.application.request(
    `${gameState.url}login?login=${namePlayer}`,
    getTokenGetPlayerStatus
  );
}

//функция-обертка для логин-страницы
function createPageLoginScreen () {
  Window.application.renderScreen(Window.application.screen.loginScreen);
  Window.application.renderBlock(
    [Window.application.block.loginInput, Window.application.block.loginButton],
    app.querySelector('.login')
  );
}


//Lobby Screen
//нажатие на кнопку 'создать игру'
function clickPlayButton() {
  createPageStandByScreen();
}

//получение информации об игроке
function getStatisticPlayer(data) {
  const parseStatisticPlayer = disassemblyJSON(data);
  let obj = parseStatisticPlayer.list;
  obj.forEach(function (obj) {
    if (Object.keys(obj).includes('you')) {
      gameState.gamerStatistic.wins = obj.wins;
      gameState.gamerStatistic.loses = obj.loses;

      window.application.renderBlock(
        [window.application.block.playerInformation],
        app.querySelector('.columnHeader')
      );
    }
  });
}

//получение информации об актуальных играх
function getAvailableGame(data) {
  while (document.querySelector('.listGames').firstChild) {
    document
      .querySelector('.listGames')
      .removeChild(document.querySelector('.listGames').lastChild);
  }
  const parseStatisticEnemy = JSON.parse(data);
  for (let enemy of parseStatisticEnemy.list) {
    Window.application.renderBlock(
      [Window.application.block.showedAvailableGame],
      document.querySelector('.listGames')
    );
  }
}

//функция-обертка для лобби-страницы
function createPageLobbyScreen() {
  Window.application.renderScreen(Window.application.screen.lobbyScreen);
  Window.application.renderBlock(
    [Window.application.block.playButton],
    app.querySelector('.columnHeader')
  );
  Window.application.request(
    `${gameState.url}player-list?token=${gameState.gamerToken}`,
    getStatisticPlayer
  );
  setInterval(
    Window.application.request,
    1000,
    `${gameState.url}player-list?token=${gameState.gamerToken}`,
    getAvailableGame
  );
  Window.application.timers.push(
    setInterval(
      Window.application.request,
      1000,
      `${gameState.url}player-list?token=${gameState.gamerToken}`,
      getAvailableGame
    )
  );
}


// standByScreen

//переход на экран лобби
function backToLobby() {
  createPageLobbyScreen();
}
//переход на экран игры
function toGame() {
  createScreen(window.application.screens.waitScreen);
}

function checkOpponentConnection(data) {
  const parsedData = disassemblyJSON(data);

  if (parsedData['status'] === 'error') {
    gameState.errorMessage = parsedData['message'];
    startErrorScreen();
    return;
  }
  gameState.enemyName = parsedData['game-status']['enemy']['login'];
  gameState.enemyStatistic.wins = parsedData['game-status']['enemy']['wins'];
  gameState.enemyStatistic.loses = parsedData['game-status']['enemy']['loses'];

  if (parsedData['game-status'].status !== 'waiting-for-start') {
    toGame();
  }
}

function createPageStandByScreen() {
  createScreen(window.application.screens.standbyScreen);
  createBlock(window.application.blocks.backToLobbyButton, document.querySelector('.undercard'));
  window.application.timers.push(setInterval(request, 1000, `${gameState.url}game-status?token=${gameState.token}`, checkOpponentConnection));
}

//waitScreen

// фуекция для появления надписи Противник ожидает хода
function switchWaitScreen(data) {
  const parsedData = disassemblyJSON(data);
  if (parsedData["game-status"].status === "waiting-for-your-move") {
    waitingText.classList.remove("hidden");
    enemyScroll.classList.add("hidden");
  }
}

// запускает процесс ожидания статуса игры
function switchToGameFieldScreen(jsonString) {
  const serverAnswer = disassemblyJSON(jsonString);
  if (serverAnswer.status === "ok") {
    if (serverAnswer["game-status"].status === "waiting-for-enemy-move") {
      return;
    }
    gameState.gameStatus = serverAnswer["game-status"].status;
    startGameFieldScreen();
    return;
  }
  gameState.errorMessage = serverAnswer.message;
  startErrorScreen();
}

const rockButton = document.querySelector(
  ".main-waitscreen__choicescreen-rock"
);
const paperButton = document.querySelector(
  ".main-waitscreen__choicescreen-paper"
);
const scissorsButton = document.querySelector(
  ".main-waitscreen__choicescreen-scissors"
);

const yourSideSpinner = document.querySelector(".your-side-spinner");

const rockImage = document.querySelector(
  ".main-waitscreen__gameprocess-choiceimage-rock"
);
const paperImage = document.querySelector(
  ".main-waitscreen__gameprocess-choiceimage-paper"
);
const scissorsImage = document.querySelector(
  ".main-waitscreen__gameprocess-choiceimage-scissors"
);

const waitingText = document.querySelector(
  ".main-waitscreen__gameprocess-text"
);

const enemyScroll = document.querySelector(".enemy-scroll");

const choiceScreen = document.querySelector(".main-waitscreen__choicescreen");



// GameField Screen
const selectPlayerChoiceBlock = (choice) => {
  switch (choice) {
    case 'rock':
      return window.application.blocks.rockDiv;

    case 'paper':
      return window.application.blocks.paperDiv;

    default:
      return window.application.blocks.scissorsDiv;
  }
};

const selectEnemyChoiceBlock = (gamerChoice, roundStatus) => {
  if (roundStatus === 'lose') {
    gameState.gameStatistic.loses += 1;

    switch (gamerChoice) {
      case 'rock':
        return window.application.blocks.paperDiv;

      case 'paper':
        return window.application.blocks.scissorsDiv;

      default:
        return window.application.blocks.rockDiv;
    }
  }

  if (roundStatus === 'win') {
    gameState.gameStatistic.wins += 1;

    switch (gamerChoice) {
      case 'rock':
        return window.application.blocks.scissorsDiv;

      case 'paper':
        return window.application.blocks.rockDiv;

      default:
        return window.application.blocks.paperDiv;
    }
  }

  switch (gamerChoice) {
    case 'rock':
      return window.application.blocks.rockDiv;

    case 'paper':
      return window.application.blocks.paperDiv;

    default:
      return window.application.blocks.scissorsDiv;
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
  window.application.renderScreen(window.application.screens.gameFieldScreen);
  window.application.renderBlock([selectPlayerChoiceBlock(gameState.turn)], app.querySelectorAll('.choice-wrapper')[0]);
  window.application.renderBlock([selectEnemyChoiceBlock(gameState.turn, gameState.objFromJSON['game-status'].status)], app.querySelectorAll('.choice-wrapper')[1]);
  setTimeout(drawCrossAndCheckMark, 4300, gameState.objFromJSON['game-status'].status);
  setTimeout(showRoundResultWindow, 5500, gameState.objFromJSON['game-status'], gameState.turn);
}

// Error Screen

function startErrorScreen() {
  window.application.renderScreen(window.application.screens.errorScreen);
  window.application.renderBlock([window.application.blocks.errorButton], app.querySelector('.error-field'));
}


document.addEventListener('DOMContentLoaded', createPageLoginScreen);
