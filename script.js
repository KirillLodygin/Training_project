const app = document.querySelector('.app');

const gameState = {
  gamerName: 'Петр',

  rivalName: 'Павел',

  turn: 'rock',

  statistic: {
    rounds: 1,
    victories: 0,
    defeats: 0,
  },

  errors: {
    ' ': 'Игрок не зарегистрирован',
    'token doesn\'t exist': 'Нет игрока или игры с таким токеном',
    'player is already in game': 'Игрок уже в игре, нельзя начать две игры одновременно',
    'no game id': 'Id игры не передан',
    'wrong game id': 'Id игры некорректный/бой не существует/бой закончен',
    'player is not in this game': 'Игрок не в этой игре',
    'no move': 'Ход не передан'
  }

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
      cls: 'rock'
    },

    paperDiv: {
      block: 'div',
      cls: 'paper'
    },

    scissorsDiv: {
      block: 'div',
      cls: 'scissors'
    },

    errorButton: {
      block: 'button',
      cls: 'error-button',
      innerText: 'Вернуться в лобби',
      method: {
        eventName: 'click',
        methodFunc: () => { createScreen(window.application.screens.loginScreen) }
      }
    }
  },

  screens: {
    loginScreen:  {
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
              innerText: `Раунд ${gameState.statistic.rounds}`,
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
                      cls: ['result', 'display-none'],
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
                      cls: ['result', 'display-none'],
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
          cls: ['rock', 'error-rock']
        },
        {
          block: 'p',
          cls: 'error-message',
          innerText: gameState.errors['token doesn\'t exist']
        },
      ]
    }
  },

  renderScreen: createScreen,
  renderBlock: createBlock,
  timers: []
}

const disassemblyJSON = objJSON => {
  const obj = JSON.parse(objJSON);
};

//window.application.renderScreen(window.application.screens.errorScreen);
//window.application.renderBlock(false, [window.application.blocks.errorButton], app.querySelector('.error-field'));
window.application.renderScreen(window.application.screens.gameFieldScreen);
