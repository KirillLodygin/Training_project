const app = document.querySelector('.app');

const gameState = {
  gamerName: 'Петр',

  rivalName: 'Павел',

  turn: 'rock',

  gameStatistic: {
    rounds: 1,
    victories: 0,
    defeats: 0,
  },

  gamerStatistic: {
    games: 1,
    victories: 0,
    defeats: 0,
  },

  rivalStatistic: {
    games: 1,
    victories: 0,
    defeats: 0,
  },

  objFromJSON: null,

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

  errors: {
    ' ': 'Игрок не зарегистрирован',
    'token doesn\'t exist': 'Нет игрока или игры с таким токеном',
    'player is already in game': 'Игрок уже в игре, нельзя начать две игры одновременно',
    'no game id': 'Id игры не передан',
    'wrong game id': 'Id игры некорректный/бой не существует/бой закончен',
    'player is not in this game': 'Игрок не в этой игре',
    'no move': 'Ход не передан',
  },
};

const templateEngine = block => {
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
};

const createScreen = (obj) => {
  if (app.hasChildNodes()) {
    while (app.firstChild) {
      app.removeChild(app.lastChild);
    }
  }

  app.appendChild(templateEngine(obj));
};

const createBlock = (clear, arrObj, parentNode) => {

  if (clear) {
    while (parentNode.firstChild) {
      parentNode.firstChild.remove();
    }
  }

  arrObj.forEach(obj => parentNode.append(templateEngine(obj)));
};

window.application = {

  blocks: {
    registrationInput: {
      block: 'input',
      cls: ['login', 'login-input'],
      attrs: {
        placeholder: 'Введи свой nikname',
      },
    },

    registrationBtn: {
      block: 'button',
      cls: ['login', 'login-button'],
      innerText: 'Войти',
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
      innerText: 'Вернуться в лобби',
      method: {
        eventName: 'click',
        methodFunc: () => {
          createScreen(window.application.screens.loginScreen);
        },
      },
    },
  },

  screens: {
    loginScreen: {
      block: 'header',
      cls: 'header',
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
                  content: [],
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
                  innerText: `${gameState.rivalName}`,
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
                          innerText: `Побед: ${gameState.gameStatistic.victories}, поражений: ${gameState.gameStatistic.defeats}, вничью: ${gameState.gameStatistic.rounds - gameState.gameStatistic.victories - gameState.gameStatistic.defeats}`,
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
          innerText: gameState.errors['token doesn\'t exist'],
        },
      ],
    },
  },

  renderScreen: createScreen,
  renderBlock: createBlock,
  timers: [],
};

const disassemblyJSON = objJSON => {
  return JSON.parse(objJSON);
};

// Тут пока имитация
let objJSON = {
  status: 'ok',
  game_status: {
    status: 'lose',
    enemy: {
      login: 'ВладБумага',
      wins: 47,
      loses: 33,
      rocks: 22,
      papers: 202,
      scissors: 13,
    },
  },
};
// Тут пока имитация
gameState.objFromJSON = objJSON;


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
    switch (gamerChoice) {
      case 'rock':
        return window.application.blocks.paperDiv;

      case 'paper':
        return window.application.blocks.scissorsDiv;

      default:
        return window.application.blocks.rockDiv;
    }
  }

  switch (gamerChoice) {
    case 'rock':
      return window.application.blocks.scissorsDiv;

    case 'paper':
      return window.application.blocks.rockDiv;

    default:
      return window.application.blocks.paperDiv;
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
  } else {
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
  } else {
    app.querySelector('.comment').innerHTML = gameState.winMessages[gamerChoice];
  }

  app.querySelector('.round-result-field').classList.remove('display-none');
}

const startGameFieldScreen = () => {
  window.application.renderScreen(window.application.screens.gameFieldScreen);
  window.application.renderBlock(false, [selectPlayerChoiceBlock(gameState.turn)], app.querySelectorAll('.choice-wrapper')[0]);
  window.application.renderBlock(false, [selectEnemyChoiceBlock(gameState.turn, gameState.objFromJSON.game_status.status)], app.querySelectorAll('.choice-wrapper')[1]);
  setTimeout(drawCrossAndCheckMark, 4300, gameState.objFromJSON.game_status.status);
  setTimeout(showRoundResultWindow, 5500, gameState.objFromJSON.game_status.status, gameState.turn);
};

//window.application.renderScreen(window.application.screens.errorScreen);
//window.application.renderBlock(false, [window.application.blocks.errorButton], app.querySelector('.error-field'));

startGameFieldScreen();
